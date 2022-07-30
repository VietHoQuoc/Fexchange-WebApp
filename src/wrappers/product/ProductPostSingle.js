import React from "react";
import axios from "axios";
import { useEffect, useState } from 'react'
const ProductPostSingle = (props) => {
    console.log(props.id)
    //we set the initial state to an empty array: useState([])
    //posts: 1st value, our current state
    //setPosts: 2nd value, is the func that is used to update your state
    const [post, setPost] = useState([]);



    // useEffect(() => {
    //     //Runs on every render
    //   });
    useEffect(() => {

        //Runs only the first render
        axios.get(`https://fbuyexchange.azurewebsites.net/api/productposts/`+ props.id)
            .then(res => {
                console.log(props.id)
                setPost(res.data);
                console.log(post)

            })
            .catch(error => console.log(error));


    }, [])



    return (

        <>
            <div className="d-flex bd-highlight example-parent">
                <div className="p-2 flex-fill bd-highlight col-example">
                    <img src={post.img} alt="xin chao"/>
                    {post.images.map((imgsrc) =><img variant="top" width="250px" height="350px" src={imgsrc.image} />)}
                </div>
                <div className="p-2 flex-fill bd-highlight col-example">
                    <h2>{post.name}</h2>
                </div>
            </div>
        </>

    );

};
export default ProductPostSingle;