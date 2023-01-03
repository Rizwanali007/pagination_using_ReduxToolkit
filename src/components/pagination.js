import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateData } from './reducer'
import axios from 'axios';
import Pagining from './pagining';

const Pagination = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true);
    const [dataPerPage, setDataPerPage] = useState(1)
    const [activePage, setActivePage] = useState(1)

    const dispatch = useDispatch()
    const stateUserData = useSelector((state) => state)
    const { fakeApidata } = stateUserData
    console.log("stateData", fakeApidata)

    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = async () => {
        setLoading(true);
        await axios.get(`https://jsonplaceholder.typicode.com/users/`)
            .then((response) => {
                console.log("RESPONSE>>>>>>>>>...............", response.data);
                dispatch(updateData(response.data))
                setLoading(false);
            }).catch((error) => console.log("ERROR", error))


    }

    const indexOfLastPost = currentPage * dataPerPage
    const indexOfFirstPost = indexOfLastPost - dataPerPage
    const currentPost = fakeApidata.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        setActivePage(pageNumber)
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: "90%", marginTop: 30 }}>
                <FlatList
                    data={currentPost}
                    onEndReachedThreshold={0}
                    // onEndReached={() => onEnd()}
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
            <View style={{ height: 30 }}>
                <Pagining
                    dataPerPage={dataPerPage}
                    totalPosts={fakeApidata.length}
                    paginate={paginate}
                    activePage={activePage}
                />
            </View>
        </View>
    )
}

export default Pagination