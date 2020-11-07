const myTheme = {
  global: {
    font: {
      family: "Roboto",
    },
    colors: {
      brand: "#63707f",
      "accent-1": "#fff",
      "accent-2": "#e5e9e9",
      "accent-3": "#FF5722",
      "accent-4": "#616E7C",
      "accent-5": "#cdcdcd",
      focus: "dark-6",
      text: {
        dark: "accent-1",
        light: "rbga(0,0,0,0.87)",
      },
    },
  },
  heading: {
    weight: 400,
    font: {
      family: "Roboto",
    },
  },
  button: {
    active: {
      border: {
        color: "#666666",
      },
    },
  },
  select: {
    background: "accent-1",
    container: {
      extend: {
        padding: "none",
      },
    },
    options: {
      text: {
        size: "medium",
        color: "black",
        pad: "xsmall",
      },
      container: {
        pad: "xsmall",
      },
    },
    icons: {
      color: "accent-2",
      margin: "none",
    },
  },
};

export default myTheme;
