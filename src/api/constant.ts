export const colors = {
  red: "#fa0057",
  blue: "#003684",
  yellow: "#fed94d",
};

export const layout = {
  devices: {
    xl: 1920, // >=1920
    lg: 1200, // >=1200
    md: 992, // >=992
    sm: 768, // >=768
    xs: 767, // <=767
    mb: 500, // <500 mobile
  },
};

function getWindowLocation() {
  let origin = "";
  if (!window.location.origin) {
    origin =
      window.location.protocol +
      "//" +
      window.location.hostname +
      (window.location.port ? ":" + window.location.port : "");
  } else {
    origin = window.location.origin;
  }
  return origin;
}

export const URL = {
  baseURL: process.env.API_HOST,

  //error
  error: "/error",
};
