import React, { Fragment, useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "graphql/usuarios/queries";

const Usuarios = () => {
  const {data, error, loading} = useQuery(GET_USERS);

  let users_db = [
    {
      _id: "1",
      email: "john@doe.com",
      id_user: "123456",
      name: "John",
      last_name: "Doe",
      role: "admin",
      status: "active",
    },
    {
      _id: "2",
      email: "jane@doe.com",
      id_user: "7890123",
      name: "Jane",
      last_name: "Doe",
      role: "admin",
      status: "active",
    },
  ];

  const [users, setUsers] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const get_users = () => {
    // Se obtiene los datos de la API
    setUsers(users_db);
  };

  useEffect(() => {
    get_users();
  }, []);

  const bChange = (e) => {
    setBusqueda(e.target.value);
  };

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
    _id: "",
    email: "",
    id_user: "",
    name: "",
    last_name: "",
    role: "",
    status: "",
  });

  const seleccionarUsuario = (item, caso) => {
    setUsuarioSeleccionado(item);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(name, value)
    setUsuarioSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const editar = () => {
    let userNueva = users;
    userNueva.map((usuario) => {
      if (usuario._id === usuarioSeleccionado._id) { 
        usuario.email = usuarioSeleccionado.email;
        usuario.id_user = usuarioSeleccionado.id_user;
        usuario.name = usuarioSeleccionado.name;
        usuario.last_name = usuarioSeleccionado.last_name;
        usuario.role = usuarioSeleccionado.role;
        usuario.status = usuarioSeleccionado.status;
      }
    });
    setUsers(userNueva);
    setModalEditar(false);
  };

  const eliminar = () => {
    setUsers(
      users.filter((usuario) => usuario._id !== usuarioSeleccionado._id)
    );
    //setUsers(usuariosNoEliminados)
    console.log(usuarioSeleccionado);
    setModalEliminar(false);
  };

  return (
    <Fragment>
      {/* <NavbarComponent /> */}
      <h1 className='text-3xl font-extrabold text-gray-900 my-3 text-center'>USUARIOS DEL SISTEMA</h1>
      <br />

      <div className='rounded-md shadow-sm -space-y-px' >
        <label>
          <b>Buscar:</b>
        </label>
        <input
          className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
          value={busqueda}
          placeholder="Búsqueda por Identificación o Nombre"
          onChange={bChange}
        />
      </div>

      <table className="tabla">
        <thead>
          <tr>
          <th scope="col">Identificación</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Correo</th>
            <th scope="col">Rol</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => {
              if (
                user._id
                  .toString()
                  .toLowerCase()
                  .includes(busqueda.toLowerCase()) ||
                user.name.toLowerCase().includes(busqueda.toLowerCase()) ||
                user.id_user.toLowerCase().includes(busqueda.toLowerCase())
              ) {
                return user;
              }
            })
            .map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.id_user}</td>
                  <td>{item.name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>{item.status}</td>
                  <td>
                    <button className='col-span-2 bg-blue-400 p-2 rounded-full shadow-md hover:bg-blue-600 text-white' onClick={() => seleccionarUsuario(item, "Editar")}>
                      Editar
                    </button>{" "}
                    {"   "}
                    <button className='col-span-2 bg-red-400 p-2 rounded-full shadow-md hover:bg-red-600 text-white'
                      onClick={() => seleccionarUsuario(item, "Eliminar")}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Usuario</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="_id"
              value={usuarioSeleccionado && usuarioSeleccionado._id}
            />
            <br />

            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={usuarioSeleccionado && usuarioSeleccionado.email}
              onChange={handleChange}
            />
            <br />

            <label>Identificación</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id_user"
              value={usuarioSeleccionado && usuarioSeleccionado.id_user}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={usuarioSeleccionado && usuarioSeleccionado.name}
              onChange={handleChange}
            />
            <br />

            <label>Apellido</label>
            <input
              className="form-control"
              type="text"
              name="last_name"
              value={usuarioSeleccionado && usuarioSeleccionado.last_name}
              onChange={handleChange}
            />
            <br />

            <label>Rol</label>
            <input
              className="form-control"
              type="text"
              name="role"
              value={usuarioSeleccionado && usuarioSeleccionado.role}
              onChange={handleChange}
            />
            <br />

            <label>Estado</label>
            <input
              className="form-control"
              type="text"
              name="status"
              value={usuarioSeleccionado && usuarioSeleccionado.status}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button onClick={() => editar()}>Actualizar</button>
          <button onClick={() => setModalEditar(false)}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás seguro que deseas eliminar el usuario{" "}
          {usuarioSeleccionado && usuarioSeleccionado.name}
        </ModalBody>
        <ModalFooter>
          <button onClick={() => eliminar()}>Sí</button>
          <button onClick={() => setModalEliminar(false)}>No</button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default Usuarios;
