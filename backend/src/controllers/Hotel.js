const Hotel = require("../models/Hotel")
const User = require("../models/User")
const stripe = require("stripe")(process.env.STRIPE_API_KEY)

const constructSearchQuery = (queryParams) => {
  let constructedQuery = {};

  //  $or query for matching either the city or country using case-insensitive("i") regular expressions
  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};

exports.searchHotel = async(req, res) => {
   try {
        const query = constructSearchQuery(req.query)

        let sortOptions = {}
        switch(req.query.sortOptions) {
            case "starRating":
                sortOptions = {starRating: -1}
                break;
            case "pricePerNightAsc":
                sortOptions = { pricePerNight: 1 }
                break;
            case "pricePerNightDesc":
                sortOptions = { pricePerNight: -1 }
                break;     
        }

        const pageSize = 5;
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1")
        const skip = (pageNumber - 1) * pageSize;

        const hotels = await Hotel.find(query).sort(sortOptions).skip(skip).limit(pageSize)

        const total = await Hotel.countDocuments(query)

        const response = {
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total/pageSize)
            }
        }

        res.json(response)
   } 
   catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
   } 
}

exports.searchHotelbyId = async(req, res) => {
  const id = req.params.id.toString()

  if(!id) {
    return res.status(400).json({
      success: false,
      message: "Hotel id is required",
    })
  }

  try {
    const hotel = await Hotel.findById(id)

    if(!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found"
      })
    }

    res.json(hotel)
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

exports.createPaymentIntent = async (req, res) => {
  try {
    const { numberOfNights } = req.body;
    const hotelId = req.params.hotelId;
    const userId = req.userId

    const user = await User.findById(userId)
    if(!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(400).json({
        success: false,
        message: "Hotel not found"
      });
    }

    const totalCost = parseInt(hotel.pricePerNight) * numberOfNights;

    const minimumChargeAmount = 100; // Adjust this according to the minimum charge amount for INR

    if (totalCost < minimumChargeAmount) {
      return res.status(400).json({
        success: false,
        message: "The total cost is below the minimum charge amount allowed for INR."
      });
    }

    const customer = await stripe.customers.create({
      name: `${user.firstName} ${user.lastName}`,
      address: {
        line1: '510 Townsend St',
        postal_code: '98140',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
      },
    })

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: "inr",
      metadata: {
        hotelId,
        userId: req.userId,
      },
      description: "Hotel Booking",
      customer: customer.id
    });

    console.log("payment intent", paymentIntent);

    if (!paymentIntent.client_secret) {
      return res.status(500).json({
        success: false,
        message: "Error creating payment intent",
      });
    }

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost
    };

    res.send(response);
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

exports.createHotelBooking = async(req, res) => {
  try {
    console.log("req body", req.body);
    const paymentIntentId = req.body.paymentIntentId
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if(!paymentIntent) {
      return res.status(400).json({
        success: false,
        message: "Payment intent not found",
      })
    }

    if(paymentIntent.metadata.hotelId !== req.params.hotelId ||
        paymentIntent.metadata.userId !== req.userId) {
          return res.status(400).json({
            success: false,
            message: "Payment intent mismatch",
          })
    }

    if(paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        success: false,
        message: `payment intent not succeeded. Status: ${paymentIntent.status}`
      })
    }

    const newBooking = {
      ...req.body,
      userId: req.userId
    }

    const hotel = await Hotel.findOneAndUpdate({_id: req.params.hotelId}, {
      $push : {
        bookings: newBooking
      }
    })

    console.log("hotel", hotel);

    if(!hotel) {
      return res.status(400).json({
        success: false,
        message: "Hotel not found",
      })
    }

    await hotel.save()
    return res.status(200).send()
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}