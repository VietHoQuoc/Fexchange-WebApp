//component dùng để thể hiện chi tiết sản phẩm có kèm hình ảnh mỗi khi nhấn nút detail trên bài post
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ImageSlider from '../image-slider/ImageSlider';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom';
const containerStyles = {
    width: '400px',
    height: '550px',
    margin: '20px auto',
};
function ProductPostDescription(props) {
    //state
    const [post, setPost] = useState({});
    const [links, setLinks] = useState([]);
    const history = useHistory();
    //lay id tu url

    console.log(links);
    //we set the initial state to an empty array: useState([])
    //posts: 1st value, our current state
    //setPosts: 2nd value, is the func that is used to update your state

    useEffect(() => {
        //Runs only the first render
        axios
            .get(
                'https://fbuyexchange.azurewebsites.net/api/productposts/' +
                    props.id
            )
            .then((res) => {
                console.log('PROPS UPDATE:' + props.id);
                console.log(
                    'https://fbuyexchange.azurewebsites.net/api/productposts/' +
                        props.id
                );
                setPost(res.data);
                console.log('post ' + post);
            })
            .catch((error) => console.log(error));
        //set links from post
    });
    // setLinks([]);
    // console.log("link1: " + links)
    // { post.images && post.images.map((imgsrc) => setLinks(links => [...links, { 'url': imgsrc.image }])) }
    // console.log("link2" + links)

    return (
        <>
            <div className="container">
                <div className="d-flex bd-highlight mt-5">
                    <div className="p-4 flex-fill bd-highlight col-6">
                        {post.images && post.images.length > 1 ? (
                            post.images &&
                            post.images.map((imgsrc) => (
                                <img
                                    variant="top"
                                    width="100px"
                                    height="200px"
                                    alt="xin chao"
                                    src={imgsrc.image}
                                />
                            ))
                        ) : (
                            // <div style={containerStyles}>
                            //     {links !== null && <ImageSlider slides={links} />}
                            // </div>
                            <img
                                alt="defaultImg"
                                width="100px"
                                height="200px"
                                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAHBg8SBw4NDQ0NEA0QDw4PEBAPDQ4NFhEWFxUSExMYKCggGBolGxUTITEhJSkrLi4uFx8zODMsNyg5LisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKcBLwMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAABAECAwcF/8QAMRABAAEDAQUFBwQDAAAAAAAAAAECAxEEEiExUXETFGGBkSIyNEFCkrEjoaLRUnLB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APs4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5uVbFEzxwknWTPu0x+8gtEO3dr4RMeWG9hcr9+fWcgrm5FPGYjzh51amiPnno8o0X+VXpD0p0lMccz5g4q1sfTEz1xDjvkzMYiIjPVVFmmnhTH5Ta6nGzMeMAsHNudq3E84h0AAAAAAAAAAAAAAAAAAAAAAAAAAAADK42qJjnEpNBO+qOkrEWn9jVzH+0A9tVem1jYxvzxeHea+Ueku9f9Pm29em1bo2PnAPPvVfKPSTvVfKPSXdFd2unNMRj8vOdVXE78egN71Xyj0lxdvVXacVR47olve6/D0b3uvw9AKNRVRTEREbvCXpZ1NVy7EVRG9ljU1V3YirGJ8HNv46etQLgAAAAAAAAAAAAAAAAAAAAAAAAAAAEV32NbE85iVqPXRiuJjkDdf9Pm51fuUdP6brZzFHjE/8c6v3KOgPSzqqabURVmJjdw4pLlW3XM85Kbc1R7MTOGU0zXVinfMg23RNyrFKu5pI7P2Pej93tYsxZo3cZ4y9AfnaWMaiPP8ADu38dPWpTNn9aKqd3HPjuTWvjp61AuAAAAAAAAAAAAAAAAAAAAAAAAAAAATa6P04nlKlxdt9pRidwIbtcVW6McYicq5sxdina4RHDmmv6fs8bGas5y2L1yI3RP2gtiNmMU7oZFERVmIjM/NH29zlP2ydvc5T9sguEPb3OU/bJ3i5y/jILkNr42etR3i5y/jLNPEzqc1RMZzPCQXgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3BsyAGDAAYMABhmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//2Q=="
                            />
                        )}
                        <h3>{post.name}</h3>
                        <h5 className="text-info">
                            <i className="fa fa-money fa-lg mr-3"></i>
                            <NumberFormat
                                value={post.price}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' đ'}
                            />
                        </h5>
                        <h5 className="text-secondary">
                            Category: {post.categoryName}
                        </h5>
                    </div>
                    {/* chứa thông tin sơ lược về người bán hàng */}
                    <div className="p-4 bd-highlight col-6">
                        <div className="row">
                            <span className="col-xs-4">
                                <img
                                    src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                                    width="100px"
                                    height="100px"
                                    alt="avatar"
                                    onClick={() =>
                                        history.push(
                                            '/shop-detail/' + post.accountId
                                        )
                                    }
                                ></img>
                            </span>
                            <span className="col-xs-8">
                                <h2
                                    onClick={() =>
                                        history.push(
                                            '/shop-detail/' + post.accountId
                                        )
                                    }
                                    className="mt-3 ml-2"
                                >
                                    {post.accountName}
                                </h2>
                            </span>
                        </div>
                        <div className="row mt-3">
                            <div className="col-6 border-right" align="center">
                                <h4>Saler</h4>
                                <img
                                    width="25px"
                                    height="25px"
                                    src="https://static.thenounproject.com/png/2435334-200.png"
                                    alt="saler"
                                />
                            </div>
                            <div className="col-6" align="center">
                                <h4>Rating</h4>
                                <img
                                    width="25px"
                                    height="25px"
                                    src="https://i.pinimg.com/originals/83/27/7d/83277dbf017b57fec73bd9a3d5b2da4d.png"
                                    alt="saler"
                                />
                            </div>
                        </div>
                        <div className="row mt-5">
                            <button
                                type="button"
                                class="btn btn-info btn-lg btn-block"
                            >
                                <i class="fa fa-comments fa-lg mr-3"></i>Chat
                                now
                            </button>
                        </div>
                        <div className="row mt-3">
                            <button
                                type="button"
                                class="btn btn-lg btn-block btn-outline-dark"
                            >
                                <i class="fa fa-phone fa-lg mr-3"></i>Call now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-fill bd-highlight row mb-5">
                <div className="col-2"></div>
                <div className="col-8">
                    <Tabs>
                        <TabList>
                            <Tab>Description</Tab>
                        </TabList>

                        <TabPanel>
                            <h2>{post.description}</h2>
                        </TabPanel>
                        <TabPanel>
                            <h2>Cực kỳ xịn xò 10 điểm 10 điểm</h2>
                        </TabPanel>
                    </Tabs>
                </div>
                <div className="col-2"></div>
            </div>
        </>
    );
}
export default ProductPostDescription;
