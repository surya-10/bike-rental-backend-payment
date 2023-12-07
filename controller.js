 async function findUserAndUpdate(id, startDate, endDate, price, days){
    let result = await client.db("rental-app").collection("images").updateOne({_id:new ObjectId(id)}, {$set:{price:price, startDate:startDate, endDate:endDate, bookedStatus:true, bookedDays:days}});
    return result;
}
module.exports = findUserAndUpdate