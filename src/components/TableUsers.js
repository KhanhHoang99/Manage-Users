import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { fetAllUsers } from '../services/userService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import './TableUser.scss';
import _, { debounce } from 'lodash';
import { CSVLink } from "react-csv";
import Papa from 'papaparse'
import { toast } from 'react-toastify';



function TableUsers() {

    const [listUsers, setListUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataEditUser, setDataEditUser] = useState({});
    const [dataDeleteUser, setDataDeleteUser] = useState({});

    const [sortBy, setSortBy] = useState('asc');
    const [sortField, setSortField] = useState('id');

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
        setListUsers(cloneListUsers);
    }

    const handleClose = () => {
        setIsShowModal(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }
    const handleShow = () => setIsShowModal(true);


    const handleEditUser = (user) => {
        setIsShowModalEdit(true);
        setDataEditUser(user)
    }
        

    const getUsers = async (page) => {

        let response = await fetAllUsers(page);
        if(response && response.data){
            setListUsers(response.data);;
            setTotalPages(response.total_pages);
        }
    }
    
    useEffect(() => {
        getUsers(1);
    }, [])

   
    
    const handlePageClick = (event) => {
        const page = event.selected + 1
        getUsers(+page);
    };
    
    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
        console.log('listUser: ', listUsers)
    }

    const handleEditUserFromEditModal = ({first_name, id}) => {
        
        const userEdit = listUsers.find(user => user.id === id);
        userEdit.first_name = first_name;
        handleClose();
    }

    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setDataDeleteUser(user);
    }

    const handleDeleteUserFromModal = (id) => {
        
        const result = listUsers.filter(user => user.id !== id);
        setListUsers(result);
    }

    const handleSearch = debounce((e) => {
        let searchKeyWord = e.target.value
        if(searchKeyWord){
            let cloneListUsers = _.cloneDeep(listUsers);
            cloneListUsers = cloneListUsers.filter((item) => item.email.includes(searchKeyWord));
            setListUsers(cloneListUsers);
        }else{
            getUsers(1);
        }
    }, 300)


    const headers = [
        { label: "id", key: "id" },
        { label: "First Name", key: "first_name" },
        { label: "Last Name", key: "last_name" },
        { label: "Email", key: "email" },   
      ];

    const csvData = listUsers;

    const csvReport = {
        data: csvData,
        headers: headers,
        filename: 'user.csv'
      };

    const handleImportCSV = (e) => {
        if(e.target && e.target.files && e.target.files[0]){
            const file = e.target.files[0];
            if(file.type !== "text/csv"){
                toast.error("Only accept csv file!", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                return;
            }

            Papa.parse(file, {
                // header: true,
                complete: function(results) {
                    let rawCSV = results.data;
                    if(rawCSV.length > 0){
                        if(rawCSV[0] && rawCSV[0].length === 3){
                            if(rawCSV[0][0] !== 'email' || rawCSV[0][1] !== 'first_name' || rawCSV[0][2] !== 'last_name'){
                                toast.error("wrong format header on csv file!");
                            }else{
                                let results = []
                                rawCSV.map((item, index) => {
                                    if(index > 0 && item.length === 3){
                                        let obj = {};
                                        obj.email = item[0];
                                        obj.first_name = item[1];
                                        obj.last_name = item[2];
                                        results.push(obj);
                                    }
                                })

                                setListUsers(results);
                            }
                            console.log(results)
                        }else{
                            toast.error("wrong format on csv file!");
                        }
                    }else{
                        toast.error("not found data on csv file!", {
                            position: "top-right",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        })
                    }
    
                }
            }); 
        }
    }

  return (

    <>
         <div className='handle-user d-sm-flex'>
          <p className="text-center"><b>List Users</b></p>
          <div className='btn-user'>      
            <input 
                type ='file' 
                id='file' 
                hidden
                onChange={(e) => {handleImportCSV(e)}}
            />
            <label htmlFor='file' className='btn btn-warning'><i className="fa-solid fa-file-export"></i> Import</label>{' '}
            <CSVLink 
                {...csvReport}
                className="btn btn-success mx-auto"
            >
                <i className="fa-solid fa-download"></i> Exort
            </CSVLink>{' '}
            <Button variant="primary" onClick={() => handleShow()}><i className="fa-solid fa-plus"></i> Add New</Button>
          </div>
        </div>
        <div className='col-12 col-sm-4 my-3'>
            <input
                placeholder='Search user by email here...'  
                type="text" 
                className="form-control"
                onChange={(e) => handleSearch(e)}
            />
        </div>
        <div className='customize-table'>
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>
                        <div className='sort-header'>
                            <span>ID</span>
                            <span>
                                <i 
                                    className="fa-solid fa-arrow-down-long" 
                                    onClick={() => {handleSort('desc', 'id')}}
                                >
                                </i>
                                <i 
                                    className="fa-solid fa-arrow-up-long" 
                                    onClick={() => {handleSort('asc', 'id')}}
                                >
                                </i>
                            </span>
                        </div>
                    </th>
                    <th>
                        <div className='sort-header'>
                            <span>First Name</span>
                            <span>
                                <i 
                                    className="fa-solid fa-arrow-down-long"
                                    onClick={() => {handleSort('desc', 'first_name')}}
                                >  
                                </i>
                                <i 
                                    className="fa-solid fa-arrow-up-long"
                                    onClick={() => {handleSort('asc', 'first_name')}}
                                >
                                </i>
                            </span>
                        </div>
                    </th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    listUsers && listUsers.length > 0 &&
                    listUsers.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td className='d-flex gap-2'>
                                    <Button variant="secondary" onClick={() => handleEditUser(user)}>Edit</Button>{' '}
                                    <Button variant="danger" onClick={() => handleDeleteUser(user)}>Delelte</Button>{' '}
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
            </Table>
        </div>
        <div className='d-flex justify-content-center'>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}  
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
            />
        </div>

        <ModalAddNew 
            show={isShowModal} 
            handleClose={handleClose}
            handleUpdateTable={handleUpdateTable}
        />
        <ModalEditUser
            show={isShowModalEdit} 
            handleClose={handleClose}
            user={dataEditUser}
            handleEditUserFromEditModal = {handleEditUserFromEditModal}
         />
         <ModalConfirm 
            show={isShowModalDelete}
            handleClose={handleClose}
            user={dataDeleteUser}
            handleDeleteUserFromModal={handleDeleteUserFromModal}
        />
    </>
  );
}

export default TableUsers;