const myTheme = {
  global: {
    font: {
      family: "Roboto",
    },
    colors: {
      brand: "#0c7c59",
      "accent-1": "#EEEEEE",
      "accent-2": "#303841",
      "accent-3": "#FF5722",
      "accent-4": "#405B64",
      focus: "dark-6",
      text: {
        dark: "accent-1",
        light: "black",
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
