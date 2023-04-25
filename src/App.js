import React from "react";

function App() {
  const [formData, setFormData] = React.useState({
    day: "",
    month: "",
    year: "",
  });

  const [messageError, setMessageError] = React.useState({
    dayM: "",
    monthM: "",
    yearM: "",
  });

  const [result, setResult] = React.useState({
    day: "",
    month: "",
    year: "",
  });

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function checkValidationDate() {
    console.log(`input year:${formData.year} month:${formData.month} day:${formData.day}`)
    var isValid=true
    if (!formData.day) {
      setMessageError((prev) => {
        return {
          ...prev,
          dayM: "This field is required",
        };
      });
      isValid=false
    }

    if (!formData.month) {
      setMessageError((prev) => {
        return {
          ...prev,
          monthM: "This field is required",
        };
      });
      isValid=false
    }

    if (!formData.year) {
      setMessageError((prev) => {
        return {
          ...prev,
          yearM: "This field is required",
        };
      });
      isValid=false
    }

    if (formData.year && (formData.year < 1000 || formData.year > 2023)) {
      setMessageError((prev) => {
        return {
          ...prev,
          yearM: "Must be a valid year",
        };
      });
      isValid=false
    }

    if (formData.month && (formData.month <= 0 || formData.month > 12)) {
      setMessageError((prev) => {
        return {
          ...prev,
          monthM: "Must be a valid month",
        };
      });
      isValid=false
    }

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (
      formData.year % 400 === 0 ||
      (formData.year % 100 !== 0 && formData.year % 4 == 0)
    )
      monthLength[1] = 29;

    // Check the range of the day
    if (formData.day && (formData.day < 0 || formData.day > monthLength[formData.month - 1])) {
      setMessageError((prev) => {
        return {
          ...prev,
          dayM: "Must be a valid day",
        };
      });
      isValid=false
    }

    return isValid;
  }

  function calculateAge() {
    var now = new Date();
    var currentYear = now.getFullYear();
    var currentMonth = now.getMonth()+1;
    var currentDate = now.getDate();

    console.log(`year:${currentYear} month:${currentMonth} day:${currentDate}`);


    var yearAge = currentYear - formData.year;

    if (currentMonth >= formData.month)
      var monthAge = currentMonth - formData.month;
    else {
      yearAge--;
      var monthAge = 12 + currentMonth - formData.month;
    }

    if (currentDate >= formData.day) var dateAge = currentDate - formData.day;
    else {
      monthAge--;
      var dateAge = 31 + currentDate - formData.day;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }

    var monthResult = monthAge === 0   ? `0` : monthAge;
    var dayResult = dateAge === 0  ? `0` : dateAge;

    setResult({
      day: dayResult,
      month: monthResult,
      year: yearAge,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setResult({
      day:"",
      month:"",
      year:""
    })
    setMessageError({
      dayM:"",
      monthM:"",
      yearM:""
    })
    if (checkValidationDate()) {
      calculateAge();
      setMessageError({
        dayM:"",
        monthM:"",
        yearM:""
      })
    }
  }

  var daylabelColor= messageError.dayM ? "text-LightRed text-sm" : "text-SmokeyGrey text-sm"
  var monthlabelColor= messageError.monthM ? "text-LightRed text-sm" : "text-SmokeyGrey text-sm"
  var yearlabelColor= messageError.yearM ? "text-LightRed text-sm" : "text-SmokeyGrey text-sm"

  return (
    <div className="bg-OffWhite">
      <div className="  flex justify-center items-center px-8 h-screen">
        {/* rounded card */}
        <div className="flex flex-col bg-white rounded-t-2xl rounded-bl-2xl rounded-br-[120px] py-12 px-8">
          {/* inputs day month year container */}
          <form className="  flex space-x-4  md:mr-28 max-w-sm">
            {/* Day */}
            <div className="flex flex-col w-1/3">
              <label className={daylabelColor}>DAY </label>
              <input
                type="text"
                name="day"
                value={formData.day}
                onChange={handleChange}
                placeholder="DD"
                className="text-2xl font-bold p-2 rounded border w-full focus:border-Purple text-black placeholder:text-LightGrey"
              />
              {messageError.dayM && (
                <p className="text-sm text-LightRed italic font-thin mt-2">
                  {messageError.dayM}
                </p>
              )}
            </div>

            {/* Month */}
            <div className="flex flex-col w-1/3">
              <label className={monthlabelColor}>MONTH </label>
              <input
                type="text"
                name="month"
                value={formData.month}
                onChange={handleChange}
                placeholder="MM"
                className="text-2xl font-bold p-2 rounded border w-full focus:border-Purple text-black placeholder:text-LightGrey"
              />
              {messageError.monthM && (
                <p className="text-sm text-LightRed italic font-thin mt-2">
                  {messageError.monthM}
                </p>
              )}
            </div>

            {/* Year */}
            <div className="flex flex-col w-1/3">
              <label className={yearlabelColor}>YEAR </label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="YYYY"
                className="text-2xl font-bold p-2 rounded border w-full focus:border-Purple text-black placeholder:text-LightGrey"
              />
              {messageError.yearM && (
                <p className="text-sm text-LightRed italic font-thin mt-2">
                  {messageError.yearM}
                </p>
              )}
            </div>
          </form>

          {/* seprator and submit button */}
          <div className="relative mt-16  h-[4.0625rem] w-full">
            <div className="h-px w-full border-b border-LightGrey absolute top-1/2"></div>
            <button
              onClick={handleSubmit}
              className="rounded-full bg-Purple  w-16 h-16  absolute left-0 right-0 mx-auto md:right-0 md:left-auto
                active:bg-black"
            >
              <svg
                className="mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                width="46"
                height="44"
                viewBox="0 0 46 44"
              >
                <g fill="none" stroke="#FFF" strokeWidth="2">
                  <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
                </g>
              </svg>
            </button>
          </div>

          {/* result section */}
          <div className="flex flex-col mt-8">
            {/* years age */}
            <div className="flex items-center">
              {/* dash space */}
              {!result.year && (
                <div className="flex space-x-4">
                  <div className="h-3 w-8 bg-Purple -skew-x-12"></div>
                  <div className="h-3 w-8 bg-Purple -skew-x-12"></div>
                </div>
              )}
              {/* number */}
              {result.year && (
                <p className=" text-Purple text-6xl italic font-bold">
                  {result.year}
                </p>
              )}
              {/* label */}
              <p className="text-black text-6xl italic font-bold ml-4">years</p>
            </div>
            {/* month age */}
            <div className="flex items-center ">
              {/* dash space */}
              {!result.month && (
                <div className="flex space-x-4">
                  <div className="h-3 w-8 bg-Purple -skew-x-12"></div>
                  <div className="h-3 w-8 bg-Purple -skew-x-12"></div>
                </div>
              )}
              {/* number */}
              {result.month && (
                <p className=" text-Purple text-6xl italic font-bold">
                  {result.month}
                </p>
              )}
              {/* label */}
              <p className="text-black text-6xl italic font-bold ml-4">
                months
              </p>
            </div>
            {/* day age */}
            <div className="flex items-center">
              {/* dash space */}
              {!result.day && (
                <div className="flex space-x-4">
                  <div className="h-3 w-8 bg-Purple -skew-x-12"></div>
                  <div className="h-3 w-8 bg-Purple -skew-x-12"></div>
                </div>
              )}
              {/* number */}
              {result.day && (
                <p className=" text-Purple text-6xl italic font-bold">
                  {result.day}
                </p>
              )}
              {/* label */}
              <p className="text-black text-6xl italic font-bold ml-4">days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
