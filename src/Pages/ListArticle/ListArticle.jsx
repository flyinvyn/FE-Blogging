import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import NavbarProfile from '../../Components/Navbar/NavbarProfile'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import ModalDelete from '../../Components/Modal/ModalDelete';
import EllipsisText from '../../Components/slice';
import ModalUpdate from '../../Components/Modal/ModalUpdate';

const ListArticle = () => {
    const id = localStorage.getItem("id")
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASEURL}/api/articles/user/${id}`)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [id])
    const columns = [
        {
            name: 'Title',
            selector: row => row.articles_title,
            sortable: true
        },
        {
            name: 'Writer',
            selector: row => row.articles_writer,
            sortable: true
        },
        {
            name: 'Content',
            selector: row => (<EllipsisText text={row.articles_content} maxChar={100} />),
            sortable: true
        },
        {
            name: 'Created',
            selector: row => row.articles_created,
            sortable: true
        },
        {
            name: 'Photo',
            selector: row => <img src={row.articles_photo} alt="Product" style={{ width: 100 }} />,
            sortable: true
        },
        {
            name: "Action",
            cell: (row) => (
                <>
                    <ModalUpdate
                        articles_id={row.articles_id}
                        articles_title={row.articles_title}
                        articles_writer={row.articles_writer}
                        articles_content={row.articles_content}
                        articles_photo={row.articles_photo}
                        key={row.articles_id}
                    />
                    <div className="mx-5">
                        <ModalDelete
                            articles_id={row.articles_id}
                            key={row.articles_id}
                        />
                    </div>
                </>
            )
        },
    ]

    const [search, setSearch] = useState("");

    return (
        <>
            <Sidebar>
                <NavbarProfile />
                <div
                    className="col-md-8 col-12"
                    style={{ backgroundColor: "#F5F5F5", width: "1100px" }}
                >
                    <div
                        className="col-md-12 border container-fluid"
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: 4,
                            border: "1px solid #9B9B9B",
                        }}
                    >
                        <div className="row">
                            <div className=" col-md-12 mt-3">
                                <div className=" col-md-12 border-bottom">
                                    <div className="row">
                                        <div className="col-md-12 p-0">
                                            <h4 className="font-weight-bold p-2">My product</h4>
                                        </div>
                                    </div>
                                    {/* <hr /> */}
                                    {/* <div className='text-end'>
                                    </div> */}
                                    <DataTable
                                        columns={columns}
                                        data={data.filter((data) => {
                                            if (search === "") {
                                                return data
                                            } else if (data.articles_title.toLowerCase().includes(search.toLowerCase())) {
                                                return data
                                            }
                                            return false
                                        })}
                                        subHeader
                                        subHeaderComponent={
                                            <input type="text" placeholder='Search' className='w-25 form-control' onChange={(e) => setSearch(e.target.value)} />
                                        }
                                        fixedHeader
                                        pagination
                                        paginationRowsPerPageOptions={[5, 10, 15, 20]}
                                    ></DataTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </>
    )
}

export default ListArticle