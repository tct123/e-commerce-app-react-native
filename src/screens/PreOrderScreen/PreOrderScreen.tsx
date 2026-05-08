import React, { useState, useEffect, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, StyleSheet, ScrollView } from "react-native";
//Address
import Address from "./components/Address";
//Redux
import { useSelector } from "react-redux";
//Steps
import Colors from "../../utils/Colors";
import { Header, SummaryOrder, TotalButton, UserForm } from "./components";
import Loader from "../../components/Loaders/Loader";

export const PreOrderScreen = (props: { route: { params: { cartItems: any; total: any; cartId: any; }; }; navigation: unknown; }) => {
  const unmounted = useRef(false);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const carts = useSelector((state) => state.cart.cartItems);
  const { cartItems, total, cartId } = props.route.params;
  const [error, setError] = useState("");
  //Can Toi uu lai
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [town, setTown] = useState("");
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      const interval = setInterval(() => {
        setLoading(false);
      }, 1000);
      return () => clearInterval(interval);
    }
    return;
  }, [isFocused]);
  const getInfo = (province: React.SetStateAction<string>, town: React.SetStateAction<string>) => {
    setProvince(province);
    setTown(town);
  };
  const getReceiver = (name: React.SetStateAction<string>, phone: React.SetStateAction<string>, address: React.SetStateAction<string>) => {
    setName(name);
    setPhone(phone);
    setAddress(address);
  };
  const checkValidation = (error: React.SetStateAction<string>) => {
    setError(error);
  };
  let orderItems: { item: any; quantity: any; }[] = [];
  cartItems.map((item: { item: { _id: any; }; quantity: any; }) => {
    orderItems.push({ item: item.item._id, quantity: item.quantity });
  });

  const fullAddress = `${address}, ${town} ,${province}`;
  const toPayment = async () => {
    try {
      if (error === undefined && province.length !== 0 && town.length !== 0) {
        props.navigation.navigate("Payment", {
          screen: "PaymentScreen",
          params: {
            fullAddress,
            orderItems,
            name,
            phone,
            total,
            cartId,
            carts,
          },
        });
      } else {
        alert("Vui lòng nhập đầy đủ thông tin.");
      }
    } catch (err) {
      throw err;
    }
    // props.navigation.navigate("Payment", {
    //   screen: "PaymentScreen",
    //   params: {
    //     fullAddress,
    //     orderItems,
    //     name,
    //     phone,
    //     total,
    //     cartId,
    //     carts,
    //   },
    // });
  };
  useEffect(() => {
    if (carts.items.length === 0) {
      props.navigation.goBack();
    }
  }, [carts.items, props.navigation]);
  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <ScrollView>
            <UserForm
              getReceiver={getReceiver}
              checkValidation={checkValidation}
            />
            <Address getInfo={getInfo} />
            <SummaryOrder cartItems={cartItems} total={total} />
          </ScrollView>
          <TotalButton toPayment={toPayment} />
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
});
