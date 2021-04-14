import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';


const Meeting_List = props => {
    const [meetings, setMeetings] = useState([{
        date: new Date(),
        name: 'coba'
    },{
        date: new Date().setDate(12),
        name: 'coba'
    },
    {
        date: new Date().setDate(12),
        name: 'cobas'
    },
    {
        date: new Date().setDate(12),
        name: 'coba'
    }
]);

    const meetingCard = () => {
        return meetings.map((m, i) =>
            <View style={styles.card} key={i}>
                <View style={styles.dateContainer}>
                    <Text style={styles.date}>{new Date(m.date).getDate()}</Text>
                </View>
                <View style={styles.meetingNameContainer}>
                    <Text style={styles.meetingName}>{m.name}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.meetingContainer}>
            {meetingCard()}
        </View>
    )
}

const styles = StyleSheet.create({
    meetingContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap' 
    },
    card: {
       borderWidth: 2,
       width: '45%',
       height: 100,
       margin: 10,
       position: 'relative'
    },
    dateContainer:  {
        height: 70,
        justifyContent: 'center',
    },
    date: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold'
    },
    meetingNameContainer: {
    },
    meetingName: {
        fontSize: 20,
        textAlign: 'center',
        borderTopWidth: 1,
    }
  });

export default Meeting_List;