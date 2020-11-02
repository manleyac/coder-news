const myTheme = {
  global: {
    font: {
      family: "Roboto",
    },
    colors: {
      brand: "#1E441E",
      "accent-1": "#F4F4F6",
      "accent-2": "#726E75",
      "accent-3": "#EE7B30",
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
       padding: "none"
      }
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
