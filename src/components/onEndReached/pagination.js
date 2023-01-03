import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateData, onEndUpdateData, onPullUpdateData } from '../reducer'
import axios from 'axios';

const UpDownPagination = () => {

    const dispatch = useDispatch()
    const stateUserData = useSelector((state) => state)
    const { fakeApidata } = stateUserData

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [offset, setOffset] = useState(6)

    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = async () => {
        setLoading(true);
        let temp = []
        for (let i = 1; i <= 5; i++) {
            await axios.get(`https://jsonplaceholder.typicode.com/users/${i}`)
                .then((response) => {
                    // console.log("RESPONSE>>>>>>>>>...............", response.data);
                    temp.push(response.data)
                    setLoading(false);
                }).catch((error) => console.log("ERROR", error))
        }
        dispatch(updateData(temp))

    }

    const onEnd = async () => {
        console.log("ON END")
        setLoading(true);
        await axios.get(`https://jsonplaceholder.typicode.com/users/${offset}`)
            .then((response) => {
                console.log("RESPONSE>>>>>>>>>", response.data);
                setOffset(offset + 1)
                // fakeApidata.splice(0, 1)
                dispatch(onEndUpdateData(response.data))
                setLoading(false);
            }).catch((error) => console.log("ERROR.....", error))
    }

    const pullToRefresh = async () => {
        console.log("offset value ", offset)
        let pageNo = offset - 6
        console.log("offset value pullToRefresh", pageNo)
        setLoading(true);
        await axios.get(`https://jsonplaceholder.typicode.com/users/${pageNo}`)
            .then((response) => {
                console.log("RESPONSE pullToRefresh >>>>>>>>>", response.data);
                setOffset(offset - 1)
                dispatch(onPullUpdateData(response.data))
                setLoading(false);
            }).catch((error) => console.log("ERROR", error))
    }

    const onRefresh = () => {
        setRefreshing(true);
        pullToRefresh();
        setRefreshing(false)
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: "90%", marginTop: 30 }}>
                <FlatList
                    data={fakeApidata}
                    refreshing={refreshing} // Added pull to refesh state
                    onRefresh={onRefresh} // Added pull to refresh control
                    ListFooterComponent={() => {
                        return (
                            <ActivityIndicator
                                color="grey"
                                loading={loading}
                                size={50}
                                style={{ height: 50, marginBottom: 30 }}
                            />
                        )
                    }}
                    onEndReachedThreshold={0}
                    onEndReached={() => onEnd()}
                    renderItem={({ item }) => {
                        // console.log("ITEM...........", item)
                        return (
                            <View
                                style={{
                                    flex: 1, alignItems: "center", marginBottom: 15,
                                    borderWidth: 1, borderRadius: 15, margin: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 50, textDecorationColor: "grey",
                                        textDecorationLine: "underline"
                                    }}>
                                    Id : {item.id}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 30, textDecorationColor: "grey",
                                        textDecorationLine: "underline"
                                    }}
                                >
                                    Name : {item.name}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 22, textDecorationColor: "grey",
                                        textDecorationLine: "underline"
                                    }}
                                >
                                    User Name : {item.username}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 15, textDecorationColor: "grey",
                                        textDecorationLine: "underline"
                                    }}
                                >
                                    Email : {item.email}</Text>
                                <Text style={{ fontSize: 12, }}>City : {item.address.city}</Text>
                                <Text style={{ fontSize: 12 }}>Suite : {item.address.suite}</Text>
                                <Text style={{ fontSize: 12 }}>ZipCode : {item.address.zipcode}</Text>
                                <Text style={{ fontSize: 12 }}>#Street Address : {item.address.street}</Text>
                                <Text
                                    style={{
                                        fontSize: 12, textDecorationColor: "grey",
                                        textDecorationLine: "underline"
                                    }}
                                >
                                    #Geo Location : Lat : {item.address.geo.lat},
                                    Lng : {item.address.geo.lng}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 15, textDecorationColor: "grey",
                                        textDecorationLine: "underline"
                                    }}
                                >
                                    #Phone : {item.phone}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 15, textDecorationColor: "grey",
                                        textDecorationLine: "underline"
                                    }}
                                >
                                    Website : {item.website}
                                </Text>
                                <Text style={{ fontSize: 12 }}>Company Name : {item.company.name}</Text>
                                <Text style={{ fontSize: 12 }}>Company CatchPhrase : {item.company.catchPhrase}</Text>
                                <Text style={{ fontSize: 12, marginBottom: 10 }}>Company Bs : {item.company.bs}</Text>
                            </View>
                        )
                    }}
                />

            </View>
        </View>
    )
}

export default UpDownPagination