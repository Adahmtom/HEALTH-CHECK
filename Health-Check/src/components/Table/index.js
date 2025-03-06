import React, { useState } from "react";
import MaterialTable from "material-table";
import { Box, ClickAwayListener, IconButton } from "@material-ui/core";
import { FaEllipsisH } from "react-icons/fa";
import styled from "styled-components";
import { useIsFetching } from "@tanstack/react-query";
import PatchedPagination from "./Pagination";

const Table = ({
  data = [],
  setFormData = undefined,
  setOpen = undefined,
  setEdit = undefined,
  remove = undefined,
  columns,
  selection = false,
  reverse = false,
  url = undefined,
  deleteID = undefined,
  select = undefined,
  tableActions = [],
  renderAction = RenderType.Context_Menu || RenderType.Inline,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openItemId, setOpenItemId] = useState(null);
  const fetching = useIsFetching();

  if (!tableActions && typeof tableActions !== "function") {
    tableActions = () => {
      return [];
    };
  }

  const handleClick = (e, id) => {
    setOpenItemId(openItemId ? null : id);
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const handleClickAway = (e) => {
    setOpenItemId(null);
    setAnchorEl(e.currentTarget === anchorEl && null);
  };

  // const navigate = useNavigate();
  return (
    <MaterialTable
      title=""
      columns={columns}
      data={data}
      isLoading={Boolean(fetching)}
      options={{
        selection: selection,
        exportButton: data.length > 0,
        actionsCellStyle: {
          backgroundColor: "none",
        },
        actionsColumnIndex: reverse ? 0 : -1,
        minBodyHeight: "200px",
        headerStyle: {
          backgroundColor: "#3DB9A4",
          color: "white",
          fontSize: "14px",
          fontWeight: "bold",
        },
      }}
      onSelectionChange={(rows) => {
        select && select(rows);
      }}
      style={{
        boxShadow: "none",
        width: "100%",
        background: "none",
        fontSize: "13px",
      }}
      actions={
        data.length > 0 && [
          {
            name: "",
            onClick: (e, data) => {
              handleClick(e, data);
            },
            position: "row",
            iconProps: {
              style: {
                position: "absolute",
              },
            },
          },
        ]
      }
      components={{
        Pagination: PatchedPagination,
        Action: (props) => {
          if (renderAction === RenderType.Context_Menu) {
            return (
              <div style={{ position: "relative" }}>
                <IconButton
                  onClick={(e) => {
                    if (!tableActions(props.data).length) return;
                    handleClick(e, props.data._id);
                  }}
                >
                  <FaEllipsisH fontSize="1rem" />
                </IconButton>
                {openItemId === props.data?._id && (
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <ContextMenuWrapper>
                      {tableActions(props.data).map((it, index) => {
                        return it.component ? (
                          it.component
                        ) : (
                          <StyledButton
                            key={index}
                            onClick={() => {
                              setOpenItemId(null);
                              it.onClick(props.data);
                            }}
                            {...it.props}
                            style={it.styles}
                          >
                            {it.name}
                          </StyledButton>
                        );
                      })}
                    </ContextMenuWrapper>
                  </ClickAwayListener>
                )}
              </div>
            );
          }
          return (
            <Box
              display="flex"
              style={{ gap: "0.5rem", justifyContent: "flex-end" }}
            >
              {tableActions(props.data).map((it) => {
                return it.component ? (
                  it.component
                ) : (
                  <StyledButton
                    key={it._id}
                    onClick={() => {
                      it.onClick(props.data);
                    }}
                    {...it.props}
                    style={it.styles}
                  >
                    {it.name}
                  </StyledButton>
                );
              })}
            </Box>
          );
        },
      }}
    />
  );
};

export default Table;

const ContextMenuWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#fff",
  textTransform: "none",
  boxShadow:
    "0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)",
  mt: 1,
  borderRadius: "0.5rem",
  overflow: "0.5rem",
  zIndex: "9999",
  top: "1",
  position: "absolute",
  right: 20,
  minWidth: "150px",
}));

const StyledButton = styled.button`
  all: unset;
  padding: 0.5rem;
  box-sizing: border-box;
  color: #000;
  cursor: pointer;
  &:hover {
    background: #f0f4fc;
    font-weight: bold;
  }
`;

export class RenderType {
  static Inline = "In-Line";
  static Context_Menu = "Context-Menu";
}
