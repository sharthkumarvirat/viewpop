import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Navbar() {
    const [apidata, setApidata] = useState([])

    const [open, setOpen] = useState(false)
    const [userdata, setUserdata] = useState({
        name: "",
        company: "",
        doc: ""
    })
    useEffect(() => {
        fetching()

    }, [])

    const fetching = () => {
        axios.get("http://14.142.7.150:5000/audit")
            .then((resp) => { console.log(resp.data); setApidata(resp.data) })
            .catch((err) => { console.log(err) })
    }

    const handleClick = (name, company, doc) => {
        setOpen(!open)
        setUserdata({ name, company, doc })
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark-subtle">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                            <a className="nav-link" href="#">Features</a>
                            <a className="nav-link" href="#">Pricing</a>
                            <a className="nav-link" aria-disabled="true">Disabled</a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="sidebar" style={{display:"flex",margin:"1px" }} >
                <nav className="navbar navbar-expand-lg bg-success-subtle w-20%">
                    <div className="container-fluid ">
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav d-flex flex-column ">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                                <a className="nav-link" href="#">Features</a>
                                <a className="nav-link" href="#">Pricing</a>
                            </div>
                        </div>
                    </div>
                </nav>

                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", width:"100%" }}>
                    <table className="table " border={6}>
                        <thead>
                            <tr>
                                <th scope="col">S.L</th>
                                <th scope="col">UserName</th>
                                <th scope="col">Company name</th>
                                <th scope="col">Documnet</th>
                                <th scope="col">Button</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                apidata.slice(1, 15).map((ele, id) => {
                                    return (
                                        <tr>
                                            <th scope="row">{id}</th>
                                            <td>{ele.username}</td>
                                            <td>{ele.companyname}</td>
                                            <td>{ele.Document}</td>
                                            <td><button onClick={() => { handleClick(ele.username, ele.companyname, ele.Document) }}>view</button></td>
                                        </tr>
                                    )
                                })

                            }
                        </tbody>
                    </table>
                </div>
                <div onClick={() => { setOpen(false) }} className='box' style={{ width: "100vw", height: "100vh", display: open ? 'block' : 'none', position: "absolute",  opacity: "0.6", background: "grey" }}>
                </div>
                <div className='bg-primary' style={{ width: "auto", height: "auto", border: "2px solid white", borderRadius: "10px", display: open ? 'block' : 'none', padding: "30px", position: "absolute",top:"50%",left:"40%", background: "#00a7fb", boxShadow: "0px 0px 30px white", color: "white" }}>
                    <h4>Name: {userdata.name}</h4>
                    <h4>Company name:{userdata.company}</h4>
                    <h4>Document:{userdata.doc}</h4>
                </div>
            </div>
        </div>
    )
}
