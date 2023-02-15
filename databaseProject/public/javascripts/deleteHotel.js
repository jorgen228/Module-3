async function deleteHotel(url, hotelId) {
  await fetch(url, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ id: hotelId }),
  })
    .then((response) => {
      if (response.ok) {
        const resData = "Hotel deleted.....";
        location.reload();
        return Promise.resolve(resData);
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      alert(response.statusText);
    });
}
