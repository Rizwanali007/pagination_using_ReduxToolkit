import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

const Pagining = ({ dataPerPage, totalPosts, paginate, activePage }) => {

    // console.log("TOTALPOST",totalPosts)
    // console.log("dataPerPage",dataPerPage)
    const pageNumbers = [];
    for (let i = 1; i <= +Math.ceil(totalPosts / dataPerPage); i++) {
        pageNumbers.push(i)
    }


    return (
        <View
            style={{
                width: "90%", marginTop: 15, borderWidth: 1, height: 40,
                borderRadius: 15, alignItems: "center", backgroundColor: "black"
            }}
        >
            <FlatList
                data={pageNumbers}
                horizontal={true}
                renderItem={({ item, index }) => {
                    // console.log("item",item)
                    return (
                        <TouchableOpacity
                            style={{
                                marginHorizontal: 12, borderWidth: 1, margin: 5,
                                padding: 5, borderRadius: 10,
                                backgroundColor: activePage === item ? 'grey' : 'white'
                            }}
                            onPress={() => paginate(item)}
                        >
                            <Text style={{ fontWeight: "600", color: activePage === item ? 'white' : 'grey' }}>{item}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default Pagining