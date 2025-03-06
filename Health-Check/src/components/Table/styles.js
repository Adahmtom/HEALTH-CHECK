import { makeStyles } from "@material-ui/core/styles";
export const useClasses = makeStyles(({ palette }) => ({
  root: {
    borderTopRightRadius: "12px",
    borderTopLeftRadius: "12px",
    boxShadow: "0px 5px 40px rgb(0 0 0 / 10%)",
    fontFamily: "Montserrat",
    overflow: "hidden",
    background: "gainsboro",
    "& .MuiPaper-root ": {
      boxShadow: "none",
    },
    "& .MuiTable-root": {
      color: palette.text.textPrimary,
      "& .MuiTableHead-root": {
        "& .MuiTableRow-head": {
          "& .MuiTableCell-head": {
            background: "rgba(90, 0, 90, 0.09)",
            color: palette.text.textPrimary,
          },
        },
      },
      "& .MuiTableRow-root": {
        "&:nth-child(even)": {
          backgroundColor: "#1E9E88",
        },
      },
    },
  },
}));
