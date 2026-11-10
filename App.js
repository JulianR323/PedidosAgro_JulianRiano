import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet
} from 'react-native';

export default function App() {
  const [cliente, setCliente] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [mensaje, setMensaje] = useState('Ingrese los datos del pedido');
  const [contadorPedidos, setContadorPedidos] = useState(0);
  const [ultimoPedido, setUltimoPedido] = useState(null);

  const registrarPedido = () => {
    if (!cliente.trim()) {
      setMensaje('Debe ingresar el nombre del cliente');
      setUltimoPedido(null);
      return;
    }
    if (!producto.trim()) {
      setMensaje('Debe ingresar un producto');
      setUltimoPedido(null);
      return;
    }

    const cantNum = Number(cantidad);
    if (!cantidad.trim() || isNaN(cantNum) || cantNum <= 0) {
      setMensaje('Ingrese una cantidad válida');
      setUltimoPedido(null);
      return;
    }

    const precioNum = Number(precioUnitario);
    if (!precioUnitario.trim() || isNaN(precioNum) || precioNum <= 0) {
      setMensaje('Ingrese un precio unitario válido');
      setUltimoPedido(null);
      return;
    }

    const total = cantNum * precioNum;
    
    setContadorPedidos(contadorPedidos + 1);
    setMensaje('Pedido registrado correctamente');
    setUltimoPedido({
      cliente: cliente.trim(),
      producto: producto.trim(),
      cantidad: cantNum,
      total: total
    });
  };

  const limpiarFormulario = () => {
    setCliente('');
    setProducto('');
    setCantidad('');
    setPrecioUnitario('');
    setMensaje('Formulario limpio');
    setUltimoPedido(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>PedidosAgroJeJe</Text>
      <Text style={styles.subtitulo}>Sistema de Registro de Pedidos</Text>

      <Text style={styles.etiqueta}>Cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe el nombre del cliente"
        value={cliente}
        onChangeText={setCliente}
      />
      <Text style={styles.etiqueta}>Producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe el producto"
        value={producto}
        onChangeText={setProducto}
      />
      <Text style={styles.etiqueta}>Cantidad</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe la cantidad"
        keyboardType="numeric"
        value={cantidad}
        onChangeText={setCantidad}
      />
      <Text style={styles.etiqueta}>Precio Unitario ($)</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe el precio unitario"
        keyboardType="numeric"
        value={precioUnitario}
        onChangeText={setPrecioUnitario}
      />

      <Pressable style={styles.boton} onPress={registrarPedido}>
        <Text style={styles.textoBoton}>Registrar pedido</Text>
      </Pressable>
      <Pressable style={styles.botonLimpiar} onPress={limpiarFormulario}>
        <Text style={styles.textoBoton}>Limpiar formulario</Text>
      </Pressable>
      <View style={styles.resultado}>
        <Text style={styles.mensaje}>{mensaje}</Text>
        
        {ultimoPedido && (
          <View style={styles.detallePedido}>
            <Text style={styles.textoDetalle}>• Cliente: {ultimoPedido.cliente}</Text>
            <Text style={styles.textoDetalle}>• Producto: {ultimoPedido.producto}</Text>
            <Text style={styles.textoDetalle}>• Cantidad: {ultimoPedido.cantidad}</Text>
            <Text style={styles.textoTotal}>• Total: ${ultimoPedido.total.toLocaleString()}</Text>
          </View>
        )}
      </View>

      <Text style={styles.contador}>Pedidos válidos en sesión: {contadorPedidos}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F2F4F8',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1b5e20',
  },
  subtitulo: {
    fontSize: 14,
    textAlign: 'center',
    color: '#64748B',
    marginBottom: 20,
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#334155',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    fontSize: 15,
  },
  boton: {
    backgroundColor: '#2e7d32',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  botonLimpiar: {
    backgroundColor: '#DC2626',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  resultado: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    minHeight: 50,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  mensaje: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    color: '#1E293B',
  },
  detallePedido: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 8,
  },
  textoDetalle: {
    fontSize: 13,
    color: '#475569',
  },
  textoTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1b5e20',
    marginTop: 4,
  },
  contador: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
});