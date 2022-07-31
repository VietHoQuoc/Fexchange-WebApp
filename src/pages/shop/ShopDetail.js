
import React, { Fragment, useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import axios from "axios";
import { Card, CardImg } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import dateFormat, { masks } from "dateformat";
import { useHistory, useParams } from 'react-router-dom';
const ShopDetail = ({ location }) => {
    //API: lay tat ca san pham theo accountId
    //lay thong tin nguoi dung theo id
    const id=useParams().id;
    const { pathname } = location;
    const [posts, setPosts] = useState([]);
    const [account, setAccount] = useState({});
    const history=useHistory();
    
    useEffect(() => {
        axios.get(`https://fbuyexchange.azurewebsites.net/api/acounts/` + id)
            .then(res => {
                setAccount(res.data);
                console.log(account);
                console.log(location);
                console.log(id)
            })
            .catch(error => console.log(error));
        axios.get(`https://fbuyexchange.azurewebsites.net/api/productposts/1/19?all=true`)
            .then(res => {
                setPosts(res.data);
                console.log(posts);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <Fragment>
            <MetaTags>
                <title>Flone | Shop Page</title>
                <meta name="description" content="Shop page of flone react minimalist eCommerce template." />
            </MetaTags>

            <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>ShopDetail</BreadcrumbsItem>

            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb />

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className='col-sm-12 col-lg-6 border-right'>
                                <div className='row'>
                                    <div className='col-2 mt-4'>
                                        {account.avatar!==null?
                                            <img alt="avatar" src={account.avatar} width="120px" height="120px"></img>
                                            :
                                            <img alt="default-avatar" src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" width="120px" height="120px"></img>

                                    }   

                                    </div>
                                    <div className='col-10'>
                                        <h2 className='mt-4 ml-4'><b>{account.fullName}</b></h2>
                                        <div className='row ml-10'>
                                            <h4 className='col-6'>
                                                {account.status === "Inactive" ?
                                                    <Fragment><i class="fa fa-toggle-off" aria-hidden="true"></i></Fragment>
                                                    :
                                                    <Fragment><i class="fa fa-toggle-on" aria-hidden="true"></i></Fragment>}
                                            </h4>
                                            
                                        </div>
                                        <div className='row ml-4'>
                                            <button class="btn btn-warning">
                                                <i class="fa fa-phone fa-lg mr-3"></i>
                                                {account.phone!=null?
                                                (<NumberFormat value={account.phone} displayType={'text'} thousandSeparator={false}/>)
                                                :
                                                (<span>Outmoded</span>)
                                                }
                                            </button>


                                        </div>
                                    </div>




                                </div>


                            </div>
                            <devider></devider>
                            <div className='col-sm-12 col-lg-6 d-flex align-self-center '>
                                <table class="table table-borderless table-condensed table-hover">
                                    <tr>
                                        <td><i class="fa fa-map-marker fa-2x mt-1"></i></td>
                                        <td className='mr-0'>
                                            {account.address!=null?
                                                (<h4 className='ml-1'>{account.address}</h4>)
                                                :
                                                (<h4 className='ml-1'>Updating...</h4>)
                                                }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><i class="fa fa-comment fa-lg mt-1"></i></td>
                                        <td><h4 className='ml-2'>{account.gmail}</h4></td>
                                    </tr>
                                </table>

                            </div>
                        </div>
                        <div className="row mt-4 ">
                            <h3 className='col-12 mb-2 row'>

                                <strong className='mr-4'>IN STOCK</strong>
                                <h4 className=''>{posts && posts.filter(i => i.accountId == id).length} of posts</h4>
                            </h3>
                            <div className='col-12'>{posts && posts.filter(i => i.accountId == id).map(p =>

                                <Card className='mt-3'>
                                    <div className='row'>
                                        {p.images.length !== 0 ?
                                            (<Card.Img className='col-4' width="300px" height="250px" variant="top" src={p.images[0].image} onClick={() => history.push("/productpost/" + p.id)}/>
                                            )
                                            :
                                            (
                                                <Card.Img className='col-4' height="250px" variant="top" 
                                                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAHBg8SBw4NDQ0NEA0QDw4PEBAPDQ4NFhEWFxUSExMYKCggGBolGxUTITEhJSkrLi4uFx8zODMsNyg5LisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKcBLwMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAABAECAwcF/8QAMRABAAEDAQUFBwQDAAAAAAAAAAECAxEEEiExUXETFGGBkSIyNEFCkrEjoaLRUnLB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APs4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5uVbFEzxwknWTPu0x+8gtEO3dr4RMeWG9hcr9+fWcgrm5FPGYjzh51amiPnno8o0X+VXpD0p0lMccz5g4q1sfTEz1xDjvkzMYiIjPVVFmmnhTH5Ta6nGzMeMAsHNudq3E84h0AAAAAAAAAAAAAAAAAAAAAAAAAAAADK42qJjnEpNBO+qOkrEWn9jVzH+0A9tVem1jYxvzxeHea+Ueku9f9Pm29em1bo2PnAPPvVfKPSTvVfKPSXdFd2unNMRj8vOdVXE78egN71Xyj0lxdvVXacVR47olve6/D0b3uvw9AKNRVRTEREbvCXpZ1NVy7EVRG9ljU1V3YirGJ8HNv46etQLgAAAAAAAAAAAAAAAAAAAAAAAAAAAEV32NbE85iVqPXRiuJjkDdf9Pm51fuUdP6brZzFHjE/8c6v3KOgPSzqqabURVmJjdw4pLlW3XM85Kbc1R7MTOGU0zXVinfMg23RNyrFKu5pI7P2Pej93tYsxZo3cZ4y9AfnaWMaiPP8ADu38dPWpTNn9aKqd3HPjuTWvjp61AuAAAAAAAAAAAAAAAAAAAAAAAAAAAATa6P04nlKlxdt9pRidwIbtcVW6McYicq5sxdina4RHDmmv6fs8bGas5y2L1yI3RP2gtiNmMU7oZFERVmIjM/NH29zlP2ydvc5T9sguEPb3OU/bJ3i5y/jILkNr42etR3i5y/jLNPEzqc1RMZzPCQXgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3BsyAGDAAYMABhmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//2Q=="
                                                onClick={() => history.push("/productpost/" + p.id)}/>
                                                
                                            )
                                        }
                                        <Card.Body className='col-8'>
                                            <Card.Title>{p.name}</Card.Title>
                                            <Card.Text >
                                                <div className='text-success'><i className='fa fa-money fa-lg mr-3'></i>
                                                    <NumberFormat value={p.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                                                </div>
                                                
                                                {p.boughDate ? (
                                                    <div className='text-secondary' variant="bottom"><i className='fa fa-calendar fa-lg mr-3'></i>
                                                    {dateFormat(p.boughDate,"mm/dd/yyyy")}
                                                    </div>
                                                ):
                                                (
                                                    <div className='text-secondary' variant="bottom"><i className='fa fa-calendar fa-lg mr-3'></i>
                                                    default
                                                    </div>
                                                ) }
                                                
                                            </Card.Text>
                                            
                                        </Card.Body>
                                    </div>

                                </Card>

                            )}
                            </div>
                        </div>
                        <div className="row">
                            <div></div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    )
}



export default (ShopDetail);