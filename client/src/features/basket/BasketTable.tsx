import { Delete, Remove, Add } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Basket, BasketItem } from "../../app/models/basket";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
  setBasket,
} from "./basketSlice";
import BasketSummary from "./BasketSummary";

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}

const BasketTable = ({ items, isBasket = true }: Props) => {
  // const { basket, setBasket, removeItem } = useStoreContext();

  const { status } = useAppSelector((state) => state.basket);

  const dispatch = useAppDispatch();

  // const [status, setStatus] = useState({
  //   loading: false,
  //   name: "",
  // });

  // function handleAddItem(productId: number, name: string) {
  //   setStatus({ loading: true, name });
  //   agent.Basket.addItem(productId)
  //     .then((basket) => dispatch(setBasket(basket)))
  //     .catch((error) => console.log(error))
  //     .finally(() => setStatus({ loading: false, name: "" }));
  // }

  // function handleRemoveItem(productId: number, quantity = 1, name: string) {
  //   setStatus({ loading: true, name });
  //   agent.Basket.removeItem(productId, quantity)
  //     .then((basket) => dispatch(removeItem({productId, quantity})))
  //     .catch((error) => console.log(error))
  //     .finally(() => setStatus({ loading: true, name: "" }));
  // }

  return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              {isBasket && <TableCell align="right"></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    ></img>
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${(item.price / 100).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  {isBasket && (
                    <LoadingButton
                      loading={
                        status === "pendingRemoveItem" + item.productId + "rem"
                      }
                      onClick={() =>
                        dispatch(
                          removeBasketItemAsync({
                            productId: item.productId,
                            quantity: 1,
                            name: "rem",
                          })
                        )
                      }
                      color="error"
                    >
                      <Remove />
                    </LoadingButton>
                  )}
                  {item.quantity}
                  {isBasket && (
                    <LoadingButton
                      loading={status === "pendingAddItem" + item.productId}
                      onClick={() =>
                        dispatch(
                          addBasketItemAsync({
                            productId: item.productId,
                          })
                        )
                      }
                      color="secondary"
                    >
                      <Add />
                    </LoadingButton>
                  )}
                </TableCell>
                <TableCell align="right">
                  ${((item.price / 100) * item.quantity).toFixed(2)}
                </TableCell>
                {isBasket && (
                  <TableCell align="right">
                    <LoadingButton
                      loading={
                        status === "pendingRemoveItem" + item.productId + "del"
                      }
                      onClick={() =>
                        dispatch(
                          removeBasketItemAsync({
                            productId: item.productId,
                            quantity: item.quantity,
                            name: "del",
                          })
                        )
                      }
                      color="error"
                    >
                      <Delete />
                    </LoadingButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default BasketTable;
