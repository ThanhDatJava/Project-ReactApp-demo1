// import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import {ferchAllUser} from '../services/userServices';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import _, { debounce } from "lodash" ;
import ModalConfirm from './ModalConfirm';
import './TableUser.scss'
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";

import { toast } from 'react-toastify';
// import ReactDOM from 'react-dom';


const TableUsers = (props) => {

    const [lisUsers,   setListUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);

    const [isShowModalAddnew, setIsShowModalAddNew] = useState(false);
    
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserDelete, setDataUserDetele] = useState({});

    const[sortBy, setSortBy] = useState("asc");
    const[sortField, setSortField] = useState("id");

    const [keyword, setKeyword] = useState("");

    const[dataExport, setDataExport] = useState([]);

    const handleClose = () => {
      setIsShowModalAddNew(false);
      setIsShowModalEdit(false);
      setIsShowModalDelete(false);
    }

    const handleUpdateTable = (user) =>{
      setListUsers([user, ...lisUsers]);
    }

    const handleEditUserFromModal = (user) => {
            let cloneListUsers = _.cloneDeep(lisUsers);
            let index = lisUsers.findIndex(item => item.id ===user.id)
            cloneListUsers[index].first_name = user.first_name;
            setListUsers(cloneListUsers);
            
    }

    useEffect(()=> {
        // call apis
       getUsers(1);

    }, [])

    

    const getUsers = async (page) => {
        let res = await ferchAllUser(page);
        if(res && res.data)
          {
            // console.log(res)
            setTotalUsers(res.total)
            setListUsers(res.data)
            setTotalPages(res.total_pages)
          }
      }

      const handlePageClick = (event) => {
        console.log("event lib: ", event)
        getUsers(+event.selected + 1);
      }

      const handleEditUser = (user) =>{
          setDataUserEdit(user);
          setIsShowModalEdit(true);
      }

      const handleDeleteUser = (user) =>{
            setIsShowModalDelete(true);
            setDataUserDetele(user);
      }

      const handleDeleteUserFromModal = (user) => {
          let cloneListUsers = _.cloneDeep(lisUsers);
          cloneListUsers = cloneListUsers.filter(item => item.id !== user.id);
          setListUsers(cloneListUsers);
      }

      const handleSort = (sortBy, sortField) =>{
        setSortBy(sortBy);
        setSortField(sortField);

        let cloneListUsers = _.cloneDeep(lisUsers);
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
        setListUsers(cloneListUsers);

      }

      const handleSearch = debounce((event) =>{
        console.log(event.target.value)
        let term = event.target.value;
        if(term){
          let cloneListUsers = _.cloneDeep(lisUsers);
          cloneListUsers = cloneListUsers.filter(item => item.email.includes(term));
          setListUsers(cloneListUsers);
        }else{
          getUsers(1);
        }
}, 1000)




       
          const getUsersExport = (event, done) => {
              let result = [];
              if(lisUsers && lisUsers.length > 0){
                  result.push(["Id", "Email", "First name", "Last name"]);
                  lisUsers.map((item, index) => {
                    let arr = [];
                    arr[0] = item.id;
                    arr[1] = item.email;
                    arr[2] = item.first_name;
                    arr[3] = item.last_name;
                    result.push(arr);
                  });
                  
                  setDataExport(result);
                  done();
              }
}    

        const handleImportCSV = (event) => {
          if (event.target && event.target.files && event.target.files[0]){
            let file = event.target.files[0];

            if(file.type !== "text/csv"){
              toast.error("Only accept csv files...");
              return ;

            }
            console.log(">>> check file up: " ,file);
            Papa.parse(file, {
              // header: true,
              complete: function(results) {
                let rawCSV = results.data;
                if(rawCSV.length > 0){
                    if(rawCSV[0] && rawCSV[0].length === 3 ){
                        if(  rawCSV[0][0] !== "email"
                          || rawCSV[0][1] !== "first_name"
                          || rawCSV[0][2] !== "last_name"
                        ){
                          toast.error("Wrong format Header CSV file !")
                        }else{
                          let result = [];

                          rawCSV.map((item, index) => {
                            if(index > 0 && item.length === 3 ){
                                let obj = {};
                                obj.email = item[0];
                                obj.first_name = item[1];
                                obj.last_name = item[2];
                                result.push(obj);
                            }
                          })
                          setListUsers(result);
                          console.log("check result: ", result);
                        }
                    }else{
                      toast.error("Wrong format CSV file !")
                    }
                }else{
                  toast.error("not found data on CSV file !")
  
                }
              }
            });
          }
        }
        // const handleImportCSV = (event) => {
        //   if (event.target && event.target.files && event.target.files[0]) {
        //     let file = event.target.files[0];
        
        //     if (file.type !== "text/csv") {
        //       toast.error("Only accept csv files...");
        //       return;
        //     }
        
        //     console.log(">>> check file up: ", file);
        //   }
        // };
 

    return ( <> 

        <div className="my-3 add-new">
            <span><h3>List Users:</h3></span>

          <div className='group-btns'>
            <label htmlFor='test' className="btn btn-warning" >
            <i className="fa-solid fa-file-arrow-up mx-1"></i> Import
              </label>
            {/* <input
              id="test" type="file" hidden
              // onChange = {(event) => handleImportCSV(event)}
              onChange={(event) => handleImportCSV(event)}
            /> */}
            <input
  id="test" type="file" hidden
  onChange={(event) => handleImportCSV(event)}
/>
            <CSVLink 
                className="btn btn-primary mx-3" 
                data={dataExport}
                filename={"ListUser.csv"}
                asyncOnClick={true}
                onClick={getUsersExport} >
                
               <i className="fa-solid fa-file-arrow-down"></i> Export
              </CSVLink>
              <button className="btn btn-success" 
                onClick={() =>
                    setIsShowModalAddNew(true)
                  }
                > 
                <i className="fa-solid fa-circle-plus"></i> Add new</button>
            </div>


              </div>

        <div className='col-4 my-3'>
          <input
          className='form-control' 
          placeholder='Search user by email....'
          // value={keyword}
          onChange={(event) => handleSearch(event)}
          />
          </div>      

        <Table striped bordered hover>
        <thead>
          <tr>
            <th >
              
              <div className='sort-header'>
              <span>
                  ID
              </span>
              <span>
                <i 
                  onClick={() => handleSort("desc","id")}
                  className="fa-solid fa-arrow-down-long"
                ></i>
                <i 
                  onClick={() => handleSort("asc","id")}
                  className="fa-solid fa-arrow-up-long"
                ></i>
              </span>
             </div>

            </th>
            <th>Email</th>

            <th>
              <div className='sort-header'>
              <span>First Name</span>  
              <span>
                <i 
                  onClick={() => handleSort("desc", "first_name")}
                  className="fa-solid fa-arrow-down-long"
                ></i>
                <i 
                   onClick={() => handleSort("asc", "first_name")}
                  className="fa-solid fa-arrow-up-long"
                ></i>
              </span>
              </div>
                
            </th>
            <th>
                <div className='sort-header'>
                <span>Last Name</span>  
              <span>
                <i 
                  onClick={() => handleSort("desc", "last_name")}
                  className="fa-solid fa-arrow-down-long"
                ></i>
                <i 
                   onClick={() => handleSort("asc", "last_name")}
                  className="fa-solid fa-arrow-up-long"
                ></i>
              </span>
                </div>
            </th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>

          {lisUsers && lisUsers.length > 0 && 
          
          lisUsers.map((item, index) => {
          
            
            return(

              <tr key ={`users-${index}`} >
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>
                  <button 
                  className="btn btn-warning mx-3 editUser"
                  onClick={() => handleEditUser(item)}
                  >Edit</button>
                  <button 
                    onClick={() => handleDeleteUser(item)}
                    className="btn btn-danger editUser">
                    Delete</button>
                </td>
              </tr>

              )

          })
          }
       
        </tbody>       
      </Table> 

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />

          <ModalAddNew 
            show={isShowModalAddnew}
            handleClose={handleClose}
            handleUpdateTable={handleUpdateTable}
          />

            <ModalEditUser 
              show={isShowModalEdit}
              handleClose={handleClose}
              dataUserEdit={dataUserEdit}
              handleEditUserFromModal={handleEditUserFromModal}
            />

            <ModalConfirm
             show={isShowModalDelete}
             handleClose={handleClose}
             dataUserDelete={dataUserDelete}
             handleDeleteUserFromModal={handleDeleteUserFromModal}
             />
      </>)
    
}

export default TableUsers;
