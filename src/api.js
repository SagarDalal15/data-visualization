export const getRawData = () =>
  fetch("https://data-visualization321.herokuapp.com").then((res) =>
    res.json()
  );
