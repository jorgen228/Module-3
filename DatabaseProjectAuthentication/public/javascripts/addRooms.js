async function addRoom(url) {
  let hotelId = parseInt(prompt("Please provide the hotel Id"));
  let capacity = parseInt(prompt("Please provide the room capacity"));
  let pricePerDay = parseInt(
    prompt("Please provide the price per day for this room")
  );
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      HotelId: hotelId,
      Capacity: capacity,
      PricePerDay: pricePerDay,
    }),
  })
    .then((response) => {
      if (response.ok) {
        const resData = "Created a new room.";
        location.reload();
        return Promise.resolve(resData);
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      alert(response.statusText);
    });
}
