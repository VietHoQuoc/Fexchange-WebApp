import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import React from "react";
import axios from "axios";
import { useEffect, useState } from 'react'
import { Card, Button, Modal } from "react-bootstrap";
import ImageSlider from "../image-slider/ImageSlider";
import { useHistory } from "react-router-dom";
import 'react-tabs/style/react-tabs.css'

const containerStyles = {
    width: "320px",
    height: "350px",
    margin: "20px auto",
};

function ProductPostRelatedList(props) {//props:biến đưa vào là post hiện trên phần detail

    const [relatedposts, setRelatedPosts] = useState([]);
    const [show, setShow] = useState(false);
    const [relatedpost, setRelatedPost] = useState({});
    const [links, setLinks] = useState([]);
    const [detailpost, setDetailPost] = useState(props.id);
    const history = useHistory(); 
    useEffect(() => {
        //Runs only the first render
        axios.get(`https://fbuyexchange.azurewebsites.net/api/productposts/1/19?all=true`)
            .then(res => {
                setRelatedPosts(res.data);
                console.log(res.data)
            })
            .catch(error => console.log(error));

    }, [])
    //detail

    //PHẦN HÌNH ẢNH BÀI ĐĂNG SẢN PHẨM
    const handleMouseOver = () => {
        //thực hiện phóng to hình ảnh
    };
    const changeToPurple = () => {

    };
    const changeToDark = () => {
    };
    const showModal = (relatedpost) => {
        setRelatedPost(relatedpost);
        setLinks([]);
        { relatedpost.images && relatedpost.images.map((imgsrc) => setLinks(links => [...links, { 'url': imgsrc.image }])) }
        setShow(true);

    };
    const handleClose = () => setShow(false);
    return (
        <>
            <div className="container" align="center">
                <div className="col-12" align="center"><h1>RELATED POST</h1></div>
                <div className="d-flex align-content-xs-stretch flex-wrap justify-content-center ">
                    {relatedposts.filter(relatedpost => relatedpost.categoryId == props.cateID && relatedpost.id != props.id).map((filteredPost) => 
                        <Card className=" border-0 col-xs-12 col-sm-6 col-lg-3" style={{ width: '20rem' }}>
                            <div className="position-relative">
                                {filteredPost.images.length > 1 ? (
                                    <Card.Img onMouseOver={handleMouseOver} variant="top" width="250px" height="350px" src={filteredPost.images[0].image} />
                                ) : (
                                    <Card.Img variant="top" width="250px" height="350px" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAHBg8SBw4NDQ0NEA0QDw4PEBAPDQ4NFhEWFxUSExMYKCggGBolGxUTITEhJSkrLi4uFx8zODMsNyg5LisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKcBLwMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAABAECAwcF/8QAMRABAAEDAQUFBwQDAAAAAAAAAAECAxEEEiExUXETFGGBkSIyNEFCkrEjoaLRUnLB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APs4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5uVbFEzxwknWTPu0x+8gtEO3dr4RMeWG9hcr9+fWcgrm5FPGYjzh51amiPnno8o0X+VXpD0p0lMccz5g4q1sfTEz1xDjvkzMYiIjPVVFmmnhTH5Ta6nGzMeMAsHNudq3E84h0AAAAAAAAAAAAAAAAAAAAAAAAAAAADK42qJjnEpNBO+qOkrEWn9jVzH+0A9tVem1jYxvzxeHea+Ueku9f9Pm29em1bo2PnAPPvVfKPSTvVfKPSXdFd2unNMRj8vOdVXE78egN71Xyj0lxdvVXacVR47olve6/D0b3uvw9AKNRVRTEREbvCXpZ1NVy7EVRG9ljU1V3YirGJ8HNv46etQLgAAAAAAAAAAAAAAAAAAAAAAAAAAAEV32NbE85iVqPXRiuJjkDdf9Pm51fuUdP6brZzFHjE/8c6v3KOgPSzqqabURVmJjdw4pLlW3XM85Kbc1R7MTOGU0zXVinfMg23RNyrFKu5pI7P2Pej93tYsxZo3cZ4y9AfnaWMaiPP8ADu38dPWpTNn9aKqd3HPjuTWvjp61AuAAAAAAAAAAAAAAAAAAAAAAAAAAAATa6P04nlKlxdt9pRidwIbtcVW6McYicq5sxdina4RHDmmv6fs8bGas5y2L1yI3RP2gtiNmMU7oZFERVmIjM/NH29zlP2ydvc5T9sguEPb3OU/bJ3i5y/jILkNr42etR3i5y/jLNPEzqc1RMZzPCQXgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3BsyAGDAAYMABhmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//2Q==" />
                                )}
                                <div className="d-flex flex-row post-action justify-content-center">
                                    <div className="p-0" ><Button > Wish</Button></div>
                                    <div className="p-0">
                                        <Button onClick={() => history.push("/productpost/" + filteredPost.id)}> Detail </Button>
                                    </div>
                                    <div className="p-0">
                                        <Button onClick={() => showModal(filteredPost)}>Modal</Button>
                                    </div>
                                </div>
                            </div>
                            <Card.Body style={{ height: '70px' }}>
                                <Card.Title onMouseOver={changeToPurple} onMouseLeave={changeToDark} className="text-center post-title">{filteredPost.name.toUpperCase()}</Card.Title>
                            </Card.Body>
                            <Card.Body>
                                <Card.Text className="text-center"><strong> VND {filteredPost.price} 000</strong></Card.Text>
                            </Card.Body>
                        </Card>
                        )
                    


                    }


                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Detail</Modal.Title>
                        </Modal.Header>
                        <Modal.Body id="modal-productpost-body">
                            <div className="d-flex bd-highlight example-parent">
                                {/* <div className="p-2 flex-fill bd-highlight col-example">
                            {post.images && post.images.map((imgsrc) => <img width="250px" height="350px" src={imgsrc.image} />)}

                        </div> */}
                                <div style={containerStyles}>
                                    {links !== null && <ImageSlider slides={links} />}
                                </div>
                                <div className="p-2 flex-fill bd-highlight col-example">

                                    <h2>{relatedpost.id}:{relatedpost.name}</h2>
                                    <h3>VND {relatedpost.price}000</h3>
                                    <p>{relatedpost.description}</p>
                                </div>
                            </div>
                        </Modal.Body>

                    </Modal>

                </div>
            </div>


        </>

    )

}
export default ProductPostRelatedList;