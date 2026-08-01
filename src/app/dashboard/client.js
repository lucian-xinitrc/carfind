'use client'
import { useState, useEffect, useRef } from "react";
import { Button, Card, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { MapPin, Phone, Info, Fuel, Gauge, UsersRound, CalendarClock, Undo2, Plus} from 'lucide-react';
import '../globals.css';

const Dash = ({ username, email }) => {
  const [selected, setSelected] = useState(true);
  const [selectedId, setSelectedId] = useState();

  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState("");

  const [name, setName] = useState("");
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState("");
  const [km, setKm] = useState("");
  const [vin, setVin] = useState("");
  const [p_owners, setPOwners] = useState("");
  const [price, setPrice] = useState("");
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalModify, setOpenModalModify] = useState(false);

  const [dealerName, setDealerName] = useState("");
  const [dealerPhone, setDealerPhone] = useState("");
  const [dealerDetails, setDealerDetails] = useState("");
  const [dealerLocation, setDealerLocation] = useState("");

  const [dealers, setDealers] = useState([] || null);
  const [runFunc, setFunc] = useState("enabled");

  const getDealers = async() => {
    const res = await fetch("/api/getDealers");
      const data = await res.json();
      setDealers(data);
  }

  if(runFunc === "enabled") {
    getDealers();
    setFunc("disabled");
  }


  const setCarNew = async(id) => {
    getCars(id);
  }
  const [cars, setCars] = useState([] || null);
  const [runFuncar, setFuncar] = useState("enabled");

  const getCars = async(id) => {
    const res = await fetch("/api/getCar",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        id
      })
    })
    const data = await res.json();
    setCars(data);
  }
  

  const handleSubmitDealer = async(e) => {
    e.preventDefault();
    const res = await fetch("/api/addDealers",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        fullname,
        phone,
        details,
        location,
      })
    })

    if(res.ok) {
      alert("Inserted!");
      setFullname("");
      setPhone("");
      setDetails("");
      setLocation("");
    } else {
      alert("Something went wrong!");
    }
  }


  const handleSubmitCars = async(e) => {
    e.preventDefault();
    const res = await fetch("/api/addCar",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        selectedId,
        name,
        fuel,
        year,
        km,
        vin,
        p_owners,
        price,
      })
    })

    if(res.ok) {
      alert("Inserted!");
      setName("");
      setFuel("");
      setKm("");
      setVin("");
      setPOwners("");
      setPrice("");
    } else {
      alert("Something went wrong!");
    }
  }
  return (
    <>
    <section className="bg-gray-950 no-scrollbar">
    {selected ? (
      <> 
      <h1 className="dark:text-white text-[#0c4663] text-center font-bold text-4xl pt-20">Welcome</h1>
      <div className="w-full justify-center flex gap-2">
        <Button 
            className="py-2 gap-2 text-md font-bold text-left px-5 flex gap- bg-transparent mt-5 border-0 border border-[1px] border-[#3b3b5d] rounded-none hover:cursor-pointer shadow-lg/20 hover:shadow-lg/50 hover:shadow-[#22467d] rounded-full dark:text-white text-[#0c4663]"
            onClick={() => {setOpenModalModify(true)}}> 
            <Plus /> Dealer
        </Button>
      </div>
      <div className="bg-gray-950 flex justify-center px-5 py-10 px-2 w-screen">
        <div>

          {dealers?.map((dealer, DealerIdx) => (
                        
            <button
              key={DealerIdx}
              className="w-full mt-5 pb-5 px-5 w-full shadow-lg/10 shadow-slate-900 border border-slate-700"     
              onClick={() => {
                setSelected(false);
                setSelectedId(String(dealer.id)); 
                setDealerName(dealer.fullname);
                setDealerPhone(dealer.phone);
                setDealerDetails(dealer.details);
                setDealerLocation(dealer.location);
                setCarNew(dealer.id);
                
              }}
            >
              <div className="w-full p-2">
              <h1 className="text-left py-5 text-2xl">{dealer.fullname}</h1>
              <div className="flex ml-5">
                <p className="flex py-2 px-4 text-sm bg-orange-300 text-black rounded-full text-center gap-1 font-bold"> <MapPin /> {dealer.location}</p>
              </div>
              </div>            
            </button>
          ))}
        </div>
      </div>
    </>) : (
        <div className="no-scrollbar">
            
            <div
              className="mt-5 py-10 px-10 pb-30 w-full shadow-lg/3 no-scrollbar"     
            >
            <Button 
              className="bg-slate-950 fixed bottom-0 mb-5 text-left px-3 flex gap-2 py-3 mt-5 border-0 border border-[1px] border-[#3b3b5d] rounded-none hover:cursor-pointer shadow-lg/20 hover:shadow-lg/50 hover:shadow-[#22467d] rounded-full dark:text-white text-[#0c4663]"
                onClick={() => {
                  setSelected(true); 
                  setSelectedId(0);
                }}> 
                <Undo2 />
              </Button>
            <div className="flex">
              <h1 className="text-4xl pb-2 font-bold">{dealerName}</h1>
              
            </div>
            <div className=" gap-4">
              <p className="p-5 flex gap-2 "> <Phone /> {dealerPhone}</p>
              <p className="p-5 flex gap-2 "> <MapPin /> {dealerLocation}</p>
              <div className="bg-slate-900 rounded-lg p-5">
                <p className="flex gap-2 "> <Info /> Details</p>
                <p className="px-5 py-5 h-20 overflow-y-scroll">{dealerDetails}</p>
              </div>
            </div>

            <Button 
            className="py-2 gap-2 text-md font-bold text-left px-5 flex gap- bg-transparent mt-5 border-0 border border-[1px] border-[#3b3b5d] rounded-none hover:cursor-pointer shadow-lg/20 hover:shadow-lg/50 hover:shadow-[#22467d] rounded-full dark:text-white text-[#0c4663]"
            onClick={() => {setOpenModalAdd(true)}}> 
                <Plus /> Add Car
            </Button>
             {cars?.map((car, CarIdx) => (
                        
                <div
                  key={CarIdx}
                  className="mt-5 py-5 px-5 w-full shadow-lg/30 border border-slate-700 rounded-2xl"     
                >
                <div>
                  <div className="w-full text-left font-bold">
                    <h1 className="text-2xl">{car.name}</h1> <p className="p-2">{car.year} </p>
                    <div className="flex justify-right">
                      <p className="py-1 px-4 text-sm bg-orange-300 text-black rounded-full text-center"> VIN: {car.vin}</p>
                    </div>
                  </div>
                  <div className="gap-2 mt-2 ml-10">
                    <p className="flex gap-2 mt-5"><Gauge /> {car.km} km</p>
                    <p className="flex gap-2 mt-5"><Fuel /> {car.fuel}</p>
                    <p className="flex gap-2 mt-5"><UsersRound /> {car.powners}</p>
                  </div>
                  <div className="flex justify-right">
                    <p className="py-1 px-5 mt-5 bg-red-600 rounded-full font-bold">{car.price} €</p>
                  </div>
                </div>
                </div>
              ))}           
            </div>
        </div>
    )
    }
    
    <div className="content-center flex justify-center">
    <Modal show={openModalModify} onClose={() => setOpenModalModify(false)}>
              <form className="w-auto" onSubmit={handleSubmitDealer}>
                  <ModalHeader className="bg-slate-950 border-0"><h4 className="text-white text-4xl font-bold text-left p-5 ">Add a new Dealer</h4></ModalHeader>
                  <ModalBody className="bg-slate-950">
                      <div className="h-[600px] overflow-y-scroll no-scrollbar bg-slate-950 px-5 py-10 rounded-lg shadow-lg/10">
                        
                              <p className="text-white pt-5 pl-5 font-bold text-1xl">Full Name</p>
                                <input 
                                  placeholder=""
                                  type="text"
                                  value={fullname}
                                  onChange={(e) => setFullname(e.target.value)}
                                  className="text-white shadow-lg/30 shadow-[#22467d] w-full border border-solid border-white/[.245] px-7 py-3 mt-5 rounded-2xl focus:outline-none"/>
                                <p className="text-white pt-5 pl-5 font-bold text-1xl">Phone Number</p>
                                <input 
                                  placeholder=""
                                  type="text"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  className="text-white shadow-lg/30 shadow-[#22467d] w-full border border-solid border-white/[.245] px-7 py-3 mt-5 rounded-2xl focus:outline-none"/>
                                <p className="text-white pt-5 pl-5 font-bold text-1xl">Details</p>
                                <input 
                                  placeholder=""
                                  type="text"
                                  value={details}
                                  onChange={(e) => setDetails(e.target.value)}
                                  className="text-white shadow-lg/30 shadow-[#22467d] w-full border border-solid border-white/[.245] px-7 py-3 mt-5 rounded-2xl focus:outline-none"/>
                                <p className="text-white pt-5 pl-5 font-bold text-1xl">Location</p>
                                <input 
                                  placeholder=""
                                  type="text"
                                  value={location}
                                  onChange={(e) => setLocation(e.target.value)}
                                  className="text-white shadow-lg/30 shadow-[#22467d] w-full border border-solid border-white/[.245] px-7 py-3 mt-5 rounded-2xl focus:outline-none"/>
                            </div>
                      </ModalBody>
                      <ModalFooter className="bg-[#16193a] border-t-[3px]">
                       <div className="w-full flex justify-center py-5">
                      <button type="submit" className="text-white w-auto border border-solid border-white/[.245] px-10 py-2 rounded-full focus:outline-none transition duration-700 ease-in-out hover:bg-white hover:text-black mr-5">Submit</button>
                      <button className="text-white w-auto border border-solid border-white/[.245] px-10 py-2 rounded-full focus:outline-none transition duration-700 ease-in-out hover:bg-white hover:text-black " onClick={() => setOpenModalModify(false)}>Close</button>
                    </div>
                      </ModalFooter>
                      </form>
                    </Modal>

        <Modal show={openModalAdd} onClose={() => setOpenModalAdd(false)}>
              <form className="w-auto" onSubmit={handleSubmitCars}>
                  <ModalHeader className="bg-slate-950 border-0"><h4 className="text-white text-4xl font-bold text-left p-5 ">Add a new Car</h4></ModalHeader>
                  <ModalBody className="bg-slate-950">
                      <div className="h-[600px] overflow-y-scroll no-scrollbar bg-slate-950 px-5 py-10 rounded-lg shadow-lg/10">
                                <p className="text-white pt-5 pl-5 font-bold text-1xl">Name</p>
                                <input 
                                  placeholder=""
                                  type="text"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  className="text-white shadow-lg/30 shadow-[#22467d] w-full border border-solid border-white/[.245] px-7 py-3 mt-5 rounded-2xl focus:outline-none"/>
                                <p className="text-white pt-5 pl-5 font-bold text-1xl">Fuel</p>
                                <input 
                                  placeholder=""
                                  type="text"
                                  value={fuel}
                                  onChange={(e) => setFuel(e.target.value)}
                                  className="text-white shadow-lg/30 shadow-[#22467d] w-full border border-solid border-white/[.245] px-7 py-3 mt-5 rounded-2xl focus:outline-none"/>
                                
                                <p className="text-white pt-5 pl-5 font-bold text-1xl">Year</p>
                                <input 
                                  placeholder=""
                                  type="text"
                                  value={year}
                                  onChange={(e) => setYear(e.target.value)}
                                  className="text-white shadow-lg/30 shadow-[#22467d] w-full border border-solid border-white/[.245] px-7 py-3 mt-5 rounded-2xl focus:outline-none"/>
                                
                                <p className="text-white pt-5 pl-5 font-bold text-1xl">Km</p>
                                <input 
                                  placeholder=""
                                  type="text"
                                  value={km}
                                  onChange={(e) => setKm(e.target.value)}
                                  className="text-white shadow-lg/30 shadow-[#22467d] w-full border border-solid border-white/[.245] px-7 py-3 mt-5 rounded-2xl focus:outline-none"/>
                                <p className="text-white pt-5 pl-5 font-bold text-1xl">Vin</p>
                                <input 
                                  placeholder=""
                                  type="text"
                                  value={vin}
                                  onChange={(e) => setVin(e.target.value)}
                                  className="text-white shadow-lg/30 shadow-[#22467d] w-full border border-solid border-white/[.245] px-7 py-3 mt-5 rounded-2xl focus:outline-none"/>
                                <p className="text-white pt-5 pl-5 font-bold text-1xl">Previous Owners</p>
                                <input 
                                  placeholder=""
                                  type="text"
                                  value={p_owners}
                                  onChange={(e) => setPOwners(e.target.value)}
                                  className="text-white shadow-lg/30 shadow-[#22467d] w-full border border-solid border-white/[.245] px-7 py-3 mt-5 rounded-2xl focus:outline-none"/>
                                <p className="text-white pt-5 pl-5 font-bold text-1xl">Price</p>
                                <input 
                                  placeholder=""
                                  type="text"
                                  value={price}
                                  onChange={(e) => setPrice(e.target.value)}
                                  className="text-white shadow-lg/30 shadow-[#22467d] w-full border border-solid border-white/[.245] px-7 py-3 mt-5 rounded-2xl focus:outline-none"/>
                            
                            </div>
                      </ModalBody>
                      <ModalFooter className="bg-[#16193a]">
                       <div className="w-full flex justify-center py-5">
                      <button type="submit" className="text-white w-auto border border-solid border-white/[.245] px-10 py-2 rounded-full focus:outline-none transition duration-700 ease-in-out hover:bg-white hover:text-black mr-5">Submit</button>
                      <button className="text-white w-auto border border-solid border-white/[.245] px-10 py-2 rounded-full focus:outline-none transition duration-700 ease-in-out hover:bg-white hover:text-black " onClick={() => setOpenModalAdd(false)}>Close</button>
                    </div>
                      </ModalFooter>
                      </form>
                    </Modal>
                    </div>
    </section>
    </>
  );
};

export { Dash };