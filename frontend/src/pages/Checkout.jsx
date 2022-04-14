import axios from 'axios'
import React from 'react'
import {useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar'
import PaymentForm from '../components/PaymentForm'
function Checkout() {
   
    const orderInfo2 =JSON.parse( sessionStorage.getItem("orderInfo"))
    const navigate = useNavigate()
    console.log(orderInfo2.Title)
    /*
     orderInfo = {
         BookId:int,
         Stock: int,
         Title: string,
         Image:link,
         Option:("buy or rent")
         Current Price

     }
    */
   
   let orderInfo = {
       Stock:4,
       Title:"book title",
       image: "https://i.pinimg.com/originals/02/d8/e2/02d8e291c90cbd527bb8bd476121dad2.jpg",
       option:"buy",
       Price:45,
       stock:4,
       BookID:4

   }
   let [insurancePlans,setInsurancePlans] = useState([
      
   ])
   //null if theres no payment info for this user
   let [paymentInfo,setPaymentInfo] = useState(null)
   let [insuranceChoice,setInsuranceChoice] = useState(null)
   let [showPaymentForm,setShowPaymentForm] = useState(false)
   const onChange = (e)=>{
       setInsuranceChoice(e.target.value)
   }
   const noPaymentButton= (e)=>{
       setShowPaymentForm(oldState=>{return !oldState})
   }
   const placeOrder = async(e)=>{
    
       try{
        let todayDate = new Date();
   
        let day = String(todayDate.getDate()).padStart(2, '0')
        let  month = String(todayDate.getMonth() + 1).padStart(2, '0')
        let year = todayDate.getFullYear()
        let todayDateString = + year + '-' + month + '-' + day  ;
        let totalPrice = orderInfo2.Price
       if(insuranceChoice){
        totalPrice += insurancePlans[+insuranceChoice].Price
       }
       if(orderInfo2.Option === "Buy"){
           console.log(paymentInfo)
           await axios.post("http://localhost:8000/purchasedetail/",{
            OrderDate: todayDateString,
            CardNo:paymentInfo.CardNo,
            User_Email:localStorage.getItem("username"),
            Quantity:orderInfo2.Stock,
            PurchaseAmt:totalPrice,
            Book_ID:orderInfo2.BookID,
            PolicyNo: insurancePlans[+insuranceChoice].PolicyNo,
            InsuranceProvider_Name : insurancePlans[+insuranceChoice].InsuranceProvider_Name,
           })
       }
       else if(orderInfo2.Option === "Rent"){
        let nextWeek = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()+7);
        let nextWeekDay = String(nextWeek.getDate()).padStart(2, '0')
        let  nextWeekMonth = String(nextWeek.getMonth() + 1).padStart(2, '0')
        let nextWeekYear = nextWeek.getFullYear()
        let nextWeekString = nextWeekYear + '-' +nextWeekMonth + '-' + nextWeekDay 
        console.log(paymentInfo)
        await axios.post("http://localhost:8000/rentaldetail/",{
            OrderDate: todayDateString,
            CardNo:paymentInfo.CardNo,
            User_Email:localStorage.getItem("username"),
            Quantity:orderInfo2.Stock,
            RentAmt:totalPrice,
            PolicyNo: insurancePlans[+insuranceChoice].PolicyNo,
            InsuranceProvider_Name : insurancePlans[+insuranceChoice].InsuranceProvider_Name, 
            StartDate : todayDateString,
            EndDate: nextWeekString,
            Book_ID:orderInfo2.BookID,
            CardNo:paymentInfo.CardNo
            



        })
       }
       navigate("/confirmOrder")
    }
    catch(e){
        console.log(e)
    }
   }
   
  
  useEffect(()=>{
    let isMounted=  true
      let fetchData = async(e)=>{
         
          try{
          

          const i = await axios.get('http://localhost:8000/insuranceplan/')
          if(isMounted){
          setInsurancePlans(i.data)
          console.log("hello")
         
          }
          }
          catch(err){
              console.log(err)
          }
          try{
            const data= await axios.get(`http://localhost:8000/payment/`,{
                params:{
                    User_Email:localStorage.getItem("username")
                }
            })
            console.log(data.data)
            setPaymentInfo(data.data)
          }
          catch(err){
              console.log(err)
          }
      }
      fetchData()
      return ()=>{isMounted = false}
  },[])
  if(!localStorage.getItem("username") || !sessionStorage.getItem("orderInfo")){
    return <><Navbar /><div>You can't view this</div></>
  }
  return (
    <div className='container'>
        <Navbar></Navbar>
        <h1 className='mt-2'>Check out order</h1>
        <div className="row mt-5 checkout-div">
            <div className = "col-md-2">
                <img className='img-fluid checkout-img' src= {orderInfo2.Image}/>
            </div>
            <div className='col-md-2'>
                <Link to= {`/book/${orderInfo2.BookID}`}>{orderInfo2.Title}</Link>
                <p>Price: {orderInfo2.Price}$</p>
                <p>Option: {orderInfo2.Option}</p>
                <p>Amount ordered: {orderInfo2.Stock}</p>
            </div>
        </div>
        <div className='row mt-5 checkout-div'>
            <div className='col-md-2'>
            <form>
            <label htmlFor='insuranceSelect'>Select insurance plan</label>
<select onChange = {onChange} value= {insuranceChoice} className = "ms-2" id="insuranceSelect" required>
    
    <option  value="" disabled selected hidden>Choose a plan</option>
    {insurancePlans.map((plan,index)=>(
        <option value={index}>{plan.InsuranceProvider_Name} {plan.PolicyNo}</option>
    ))}
</select>
</form>
            
            </div>
            <div className='col-md-2'>
                {insuranceChoice &&
                <><h6>Info about selected plan</h6>
                <p>Provider name: {insurancePlans[+insuranceChoice].InsuranceProvider_Name}</p>
                <p>Policy no: {insurancePlans[+insuranceChoice].PolicyNo}</p>
                <p>Coverage duration: {insurancePlans[+insuranceChoice].CoverageDuration} days</p>
                <p>Price: {insurancePlans[+insuranceChoice].Price}$</p>
                <p>Details: {insurancePlans[+insuranceChoice].Details}</p>
                
                <p>Total price: {(insurancePlans[+insuranceChoice].Price + orderInfo2.Price).toFixed(2)}$ </p>
                </>
}
            </div>

            <div className='row checkout-div'>
               <div className='col-md4'>
            {paymentInfo ? 
            <><p>Using payment method linked on account </p><button onClick={placeOrder} className='btn btn-warning mt-3'>Confirm order</button></>:
           <button onClick = {noPaymentButton} className='btn btn-warning mt-3'>Click here to add a payment to account method before proceeding</button>}
           {showPaymentForm && 
           <PaymentForm setCheckoutInfo= {setPaymentInfo} setShowPaymentForm = {setShowPaymentForm}></PaymentForm>}

            </div>
            </div>
        </div>

    </div>
  )
}

export default Checkout