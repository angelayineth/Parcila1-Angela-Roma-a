import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button, Card, RadioButton, Provider } from 'react-native-paper';
import detalles from '../assets/detalles.json';

export default function ReservaCitas() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const times = ['09:30 am', '10:00 am', '11:00 am', '12:00 pm'];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarDays = [...Array(firstDay).fill(null), ...Array.from({length: daysInMonth}, (_, i) => i + 1)];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedService || !selectedDetail) 
      return alert('Selecciona todos los campos antes de agendar.');
    const variante = selectedService.variantes.find(v => v.tipo === selectedDetail);
    alert(`Cita agendada:\nServicio: ${selectedService.nombre} - ${variante.tipo}\nDuración: ${variante.duracion}\nPrecio: $${variante.precio}\nFecha: ${selectedDate}/${month + 1}/${year}\nHora: ${selectedTime}`);
  };

  return (
    <Provider>
      <ScrollView style={s.container}>
        <View style={s.header}><Text style={s.title}>Agendar Cita</Text></View>

        <View style={s.content}>
          <Card style={s.card}>
            <Card.Content>
              <Text style={s.sectionTitle}>Seleccionar Fecha</Text>
              <View style={s.sectionLine} />
              <View style={s.weekDays}>{['D','L','M','M','J','V','S'].map((d,i)=><Text key={i} style={s.weekDayText}>{d}</Text>)}</View>
              <View style={s.daysContainer}>
                {calendarDays.map((day,i)=>(
                  <TouchableOpacity key={i} style={[s.day, day===selectedDate&&s.selectedDay, day===null&&{backgroundColor:'transparent'}]} onPress={()=>day&&setSelectedDate(day)} disabled={!day}>
                    <Text style={day===selectedDate?s.selectedDayText:s.dayText}>{day||''}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card.Content>
          </Card>

          <Text style={s.sectionTitle}>Seleccionar Hora</Text>
          <View style={s.sectionLine} />
          <View style={s.timeSlots}>
            {times.map((time,i)=>(
              <Button key={i} mode={selectedTime===time?'contained':'outlined'} onPress={()=>setSelectedTime(time)} style={selectedTime===time?s.timeButtonActive:s.timeButton} textColor={selectedTime===time?'#fff':'#333'}>{time}</Button>
            ))}
          </View>

          <Text style={s.sectionTitle}>Seleccionar Servicio</Text>
          <View style={s.sectionLine} />
          <View style={s.servicesWrapper}>
            {detalles.map((s1)=>
              <TouchableOpacity key={s1.nombre} style={[s.serviceButton, selectedService?.nombre===s1.nombre&&s.serviceButtonSelected]} onPress={()=>{setSelectedService(s1); setSelectedDetail(null)}}>
                <Text style={[s.serviceText, selectedService?.nombre===s1.nombre&&s.serviceTextSelected]}>{s1.nombre}</Text>
              </TouchableOpacity>
            )}
          </View>

          {selectedService && (
            <>
              <Text style={s.sectionTitle}>Detalle del Servicio</Text>
              <View style={s.sectionLine} />
              <RadioButton.Group onValueChange={setSelectedDetail} value={selectedDetail}>
                {selectedService.variantes.map((d,i)=>
                  <Card key={i} style={s.card}>
                    <RadioButton.Item label={`${d.tipo} | Duración: ${d.duracion} | Precio: $${d.precio}`} value={d.tipo} color="#545b54ff"/>
                  </Card>
                )}
              </RadioButton.Group>
            </>
          )}

          <Button mode="contained" style={s.galleryBtn} onPress={handleBooking}>Agendar Cita</Button>
        </View>
      </ScrollView>
    </Provider>
  );
}

const s = StyleSheet.create({
  container:{flex:1,backgroundColor:'#fffffdff'},
  header:{padding:30, paddingBottom:29, backgroundColor:'#a8c5a2', borderBottomLeftRadius:30, borderBottomRightRadius:30},
  title:{fontSize:21,fontWeight:'bold',color:'#f4f6f3ff',alignSelf:'center'},
  content:{paddingHorizontal:22,marginTop:15},
  sectionTitle:{fontSize:20,fontWeight:'bold',color:'#4b633e',alignSelf:'center',marginTop:20},
  sectionLine:{height:3,width:'35%',backgroundColor:'#a8b99a',borderRadius:2,marginVertical:7,alignSelf:'center'},
  card:{marginVertical:5,borderRadius:15,overflow:'hidden',backgroundColor:'#fff',elevation:4},
  weekDays:{flexDirection:'row',justifyContent:'space-around',marginTop:10},
  weekDayText:{fontWeight:'bold',color:'#554f4fff',marginTop:10},
  daysContainer:{flexDirection:'row',flexWrap:'wrap',marginTop:18},
  day:{width:'13%',aspectRatio:1,justifyContent:'center',alignItems:'center',margin:'0.5%',borderRadius:50,backgroundColor:'#e5e5e5'},
  selectedDay:{backgroundColor:'#a8c5a2'},
  selectedDayText:{color:'#fff',fontWeight:'bold'},
  dayText:{color:'#333'},
  timeSlots:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',marginVertical:10},
  timeButton:{marginVertical:5,width:'48%',backgroundColor:'#e0e0e0'},
  timeButtonActive:{marginVertical:5,width:'48%',backgroundColor:'#a8c5a2'},
  servicesWrapper:{flexDirection:'row',flexWrap:'wrap',justifyContent:'center',marginVertical:15},
  serviceButton:{minWidth:'46%',paddingVertical:15,margin:5,borderRadius:50,backgroundColor:'#e0e0e0',alignItems:'center'},
  serviceButtonSelected:{backgroundColor:'#41884585'},
  serviceText:{fontWeight:'bold',color:'#333',textAlign:'center',fontSize:12},
  serviceTextSelected:{color:'#fff'},
  galleryBtn:{marginVertical:20,borderRadius:25,paddingVertical:10,backgroundColor:'#a8c5a2'}
});

