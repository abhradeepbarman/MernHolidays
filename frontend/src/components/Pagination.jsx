
function Pagination({page, pages, onPageChange}) {
    let pageNumbers = [];
    for(let i=1; i<=pages; i++) {
        pageNumbers.push(i)
    }

  return (
    <div className="flex justify-center">
        <ul className="flex border border-slate-300">
            {
                pageNumbers.map((number) => (
                    <li key={number} className={`px-2 py-1 ${page === number ? "bg-gray-200" : ""} group`}>
                        <button className="group" onClick={() => onPageChange(number)}>{number}</button>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default Pagination