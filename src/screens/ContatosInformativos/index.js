import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import { COLORS, SIZES } from '../../utils/constants';

import { themeDefault } from '../../config';
import { useContext } from 'react/cjs/react.development';
import Context from '../../context';

import Header from '../../components/Header';

const dataList = [
  {
    key: '1',
    text: 'MINHA CORRETORA',
    icon: 'home',
    href: 'contatoCorretora'
  },
  {
    key: '2',
    text: 'MEU CORRETOR',
    icon: 'user',
    href: 'contatoCorretor'
  },
];

const ContatosInformativos = ({ navigation }) => {
  const { corretora } = useContext(Context);

  const Body = () => {
    const numColumns = 3;

    const formatData = (data, numColumns) => {
      const totalRows = Math.floor(data.length / numColumns);

      let totalLastRow = data.length - (totalRows * numColumns);

      while(totalRows !== 0 && totalLastRow !== numColumns) {
        dataList.push({
          key: 'black',
          empty: true
        });

        totalLastRow++;
      }

      return dataList;
    }

    const renderItem = ({item, index}) => {
      if((item.empty)) {
        return <View style={{
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          height: 100,
          flex: 1,
          margin: 1,
          height: SIZES.width / (numColumns / 1.2)
        }} />
      }

      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(item.href);
          }}
          activeOpacity={1} 
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            flex: 1,
            margin: 1,
            height: SIZES.width / (numColumns / 1.2),
            margin: 5,
            padding: 5
          }}
        >
          <View
            style={{
              backgroundColor: '#f1f1f9',
              padding: 20, 
              borderRadius: 100,
            }}
          >
            <Feather size={50} color='#444' name={item.icon} />
          </View>
          <Text style={{
            color: '#444',
            fontSize: 15,
            textAlign: 'center',
            fontWeight: '700',
            marginTop: 10
          }}>{item.text}</Text>
        </TouchableOpacity>
      )
    }

    return (
      <View style={{
        flex: 1,
      }}>
        <FlatList
          style={{ paddingTop: 20 }}
          scrollEnabled={false}
          data={formatData(dataList, numColumns)}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
        />
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>
      <Header title='CONTATOS INFORMATIVOS' navigation={navigation} />
      <Body />
    </View>
  )
}

export default ContatosInformativos;