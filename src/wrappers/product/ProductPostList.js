
import React, { Fragment } from "react";
import axios from "axios";
import { useEffect, useState } from 'react'
import { Card, Button, Modal, Figure } from "react-bootstrap";
import ImageSlider from "../image-slider/ImageSlider";
import { useHistory } from "react-router-dom";
import '../../assets/scss/_postcard.scss';

// import "../../assets/scss/styleCard.scss"
const containerStyles = {
    width: "320px",
    height: "350px",
    margin: "20px auto",
};
const styleFigure = {
    backgroundImage: "url('https://source.unsplash.com/78A265wPiO4')",
    backgroundSize: 'cover',

}

function ProductPostList() {
    //we set the initial state to an empty array: useState([])
    //posts: 1st value, our current state
    //setPosts: 2nd value, is the func that is used to update your state
    const [posts, setPosts] = useState([]);
    const [show, setShow] = useState(false);
    const [post, setPost] = useState({})
    const [links, setLinks] = useState([])
    const history = useHistory();
    // useEffect(() => {
    //     //Runs on every render
    //   });
    useEffect(() => {
        //Runs only the first render
        axios.get(`https://fbuyexchange.azurewebsites.net/api/productposts/1/19?all=true`)
            .then(res => {
                setPosts(res.data);
                console.log(posts)
            })
            .catch(error => console.log(error));

    }, [])
    //PHẦN HÌNH ẢNH BÀI ĐĂNG SẢN PHẨM
    const handleMouseOver = () => {
        //thực hiện phóng to hình ảnh
    }
    const changeToPurple = () => {

    }
    const changeToDark = () => {
    }
    //NÚT WISH

    //NÚT DETAIL


    //NÚT MODAL
    const showModal = (post) => {
        setPost(post);
        setLinks([]);
        console.log(links)
        { post.images && post.images.map((imgsrc) => setLinks(links => [...links, { 'url': imgsrc.image }])) }
        setShow(true);
        console.log(post);
        console.log(links);

    };
    const handleClose = () => setShow(false);




    return (

        //Choose from no wrapping at all (the browser default) with .flex-nowrap, wrapping with .flex-wrap, or reverse wrapping with .flex-wrap-reverse.
        // <div className="container" align="center">
        //         <div className="d-flex align-content-xs-stretch flex-wrap justify-content-center ">
        //             {posts.map((post) => 
        //                 <Card className=" border-0 col-xs-12 col-sm-6 col-lg-3" style={{ width: '20rem' }}>
        //                     <div className="position-relative">
        //                         {post.images.length > 1 ? (
        //                             <Card.Img onMouseOver={handleMouseOver} variant="top" width="250px" height="350px" src={post.images[0].image} />
        //                         ) : (
        //                             <Card.Img variant="top" width="250px" height="350px" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAHBg8SBw4NDQ0NEA0QDw4PEBAPDQ4NFhEWFxUSExMYKCggGBolGxUTITEhJSkrLi4uFx8zODMsNyg5LisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKcBLwMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAABAECAwcF/8QAMRABAAEDAQUFBwQDAAAAAAAAAAECAxEEEiExUXETFGGBkSIyNEFCkrEjoaLRUnLB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APs4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5uVbFEzxwknWTPu0x+8gtEO3dr4RMeWG9hcr9+fWcgrm5FPGYjzh51amiPnno8o0X+VXpD0p0lMccz5g4q1sfTEz1xDjvkzMYiIjPVVFmmnhTH5Ta6nGzMeMAsHNudq3E84h0AAAAAAAAAAAAAAAAAAAAAAAAAAAADK42qJjnEpNBO+qOkrEWn9jVzH+0A9tVem1jYxvzxeHea+Ueku9f9Pm29em1bo2PnAPPvVfKPSTvVfKPSXdFd2unNMRj8vOdVXE78egN71Xyj0lxdvVXacVR47olve6/D0b3uvw9AKNRVRTEREbvCXpZ1NVy7EVRG9ljU1V3YirGJ8HNv46etQLgAAAAAAAAAAAAAAAAAAAAAAAAAAAEV32NbE85iVqPXRiuJjkDdf9Pm51fuUdP6brZzFHjE/8c6v3KOgPSzqqabURVmJjdw4pLlW3XM85Kbc1R7MTOGU0zXVinfMg23RNyrFKu5pI7P2Pej93tYsxZo3cZ4y9AfnaWMaiPP8ADu38dPWpTNn9aKqd3HPjuTWvjp61AuAAAAAAAAAAAAAAAAAAAAAAAAAAAATa6P04nlKlxdt9pRidwIbtcVW6McYicq5sxdina4RHDmmv6fs8bGas5y2L1yI3RP2gtiNmMU7oZFERVmIjM/NH29zlP2ydvc5T9sguEPb3OU/bJ3i5y/jILkNr42etR3i5y/jLNPEzqc1RMZzPCQXgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3BsyAGDAAYMABhmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//2Q==" />
        //                         )}
        //                         <div className="d-flex flex-row post-action justify-content-center">
        //                             <div className="p-0" ><Button > Wish</Button></div>
        //                             <div className="p-0">
        //                                 <Button onClick={() => history.push("/productpost/" + post.id)}> Detail </Button>
        //                             </div>
        //                             <div className="p-0">
        //                                 <Button onClick={() => showModal(post)}>Modal</Button>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <Card.Body style={{ height: '70px' }}>
        //                         <Card.Title onMouseOver={changeToPurple} onMouseLeave={changeToDark} className="text-center post-title">{post.name.toUpperCase()}</Card.Title>
        //                     </Card.Body>
        //                     <Card.Body>
        //                         <Card.Text className="text-center"><strong> VND {post.price} 000</strong></Card.Text>
        //                     </Card.Body>
        //                 </Card>
        //                 )



        //             }


        //             <Modal
        //                 show={show}
        //                 onHide={handleClose}
        //                 backdrop="static"
        //                 keyboard={false}
        //             >
        //                 <Modal.Header closeButton>
        //                     <Modal.Title>Detail</Modal.Title>
        //                 </Modal.Header>
        //                 <Modal.Body id="modal-productpost-body">
        //                     <div className="d-flex bd-highlight example-parent">
        //                         {/* <div className="p-2 flex-fill bd-highlight col-example">
        //                     {post.images && post.images.map((imgsrc) => <img width="250px" height="350px" src={imgsrc.image} />)}

        //                 </div> */}
        //                         <div style={containerStyles}>
        //                             {links !== null && <ImageSlider slides={links} />}
        //                         </div>
        //                         <div className="p-2 flex-fill bd-highlight col-example">

        //                             <h2>{post.id}:{post.name}</h2>
        //                             <h3>VND {post.price}000</h3>
        //                             <p>{post.description}</p>
        //                         </div>
        //                     </div>
        //                 </Modal.Body>

        //             </Modal>

        //         </div>
        //     </div>
        <>
            <div class="container">

                <div class="figure-container">

                    <Figure class="card card--1" style={styleFigure} >
                        {/* <img src="https://source.unsplash.com/78A265wPiO4"style={{objectFit:"cover"}}  alt="img" width="250px" height="350px"/> */}
                        <Figure.Caption>
                            <div className="active f-info">
                                <button><i class="fa fa-heart"></i></button>
                            </div>
                            {/* <a className="f-info" href="#"></a>
                            <a className="f-info" href="#">Select option</a>
                            <a className="f-info" href="#"><i class="fa fa-eye"></i></a> */}


                        </Figure.Caption>
                    </Figure>


                </div>



                <div class="support">
                    <a href="https://twitter.com/DevLoop01" target="_blank"><i class="fab fa-twitter-square"></i></a>
                    <a href="https://dribbble.com/devloop01" target="_blank"><i class="fab fa-dribbble"></i></a>
                </div>


            </div >



            <div class="support">
                <a href="https://twitter.com/DevLoop01" target="_blank"><i class="fab fa-twitter-square"></i></a>
                <a href="https://dribbble.com/devloop01" target="_blank"><i class="fab fa-dribbble"></i></a>
            </div>
        </>


    )

}
export default ProductPostList;


