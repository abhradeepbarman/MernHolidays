import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setSearchValues } from "../../Store/slices/SearchSlice";

function GuestInfoForm({ hotelId, pricePerNight }) {
  const search = useSelector((state) => state.search);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation()
  const dispatch = useDispatch();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onsubmit = (data) => {

    dispatch(setSearchValues({
      destination: "",
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      adultCount: data.adultCount,
      childCount: data.childCount
    }))

    navigate(`/hotel/${hotelId}/booking`);
  };

  const onSignInClick = (data) => {
    dispatch(setSearchValues({
      destination: "",
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      adultCount: data.adultCount,
      childCount: data.childCount
    }))

    navigate("/sign-in", { state: { from: location }})
  }

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-xl font-bold">₹ {pricePerNight}</h3>

      <form onSubmit={
        token ? handleSubmit(onsubmit) : handleSubmit(onSignInClick)
      }>
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              dateFormat="dd-MM-yyyy"
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none "
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn}
              maxDate={maxDate}
              dateFormat="dd-MM-yyyy"
              placeholderText="Check-out Date"
              className="min-w-full bg-white p-2 focus:outline-none "
              wrapperClassName="min-w-full"
            />
          </div>

          <div className="flex bg-white px-2 py-1 gap-2">
            <label className="flex items-center">
              Adults:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be atleast 1 adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <span className="text-red-500 font-semibold text-sm">
              {errors.adultCount && errors.adultCount.message}
            </span>

            <label className="flex items-center">
              Children:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm"></span>
            )}
          </div>

          {
            token 
            ? (
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
            >
              Book Now
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
            >
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default GuestInfoForm;
