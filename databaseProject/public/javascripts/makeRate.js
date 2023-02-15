async function makeARate(userId, url) {
  let value = prompt("Rate the hotel from 1 to 5");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      UserId: userId,
      Value: value,
    }),
  });
  const resData = "Made a rate";
  location.reload();
  return resData;
}
