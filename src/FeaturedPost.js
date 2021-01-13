import React,{useContext,useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import comment from './assets/img/comment_button.svg'
import share from './assets/img/share_button.svg'
import axios from 'axios'
import './App.css'
import { Button } from '@material-ui/core';
import logo from './assets/img/logo_ballin_small.svg'

import UserContext from './contexts/UserContext'
import BallerContext from './contexts/BallerContext'
import TeamContext from './contexts/TeamContext'
import deleteIcon from './assets/img/deleteIcon.png'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  card: {
    // display: 'flex',
    //backgroundImage: `url(${background})`,
    //maxWidth: 900,
    backgroundColor: 'rgb(52,91,137,0.4)',
    color: 'white'
  },
  cardDetails: {
    flex: 1,
    width: '100%',
    color: 'white'

  },
  cardMedia: {
    width: '100%',
  },
  profilePic: {
    borderRadius: '50%',
      position: 'relative',
      width: '60px',
      height: '60px',
      overflow: 'hidden',
    // backgroundRepeat: 'no-repeat',
    // backgroundPosition: 'center center',
    // backgroundSize: 'cover',
    // backgroundImage: `url(${profilePic})`,
    // position: 'absolute',
    //  top: '50%',
    //  transform: 'translateY(-50%)',
    // transform: translateY(-50%);
    //border: 'solid 1px black',

  },
  media: {
    //height: 0,
    paddingTop: '56.25%', // 16:9
    minWidth: '100%'
    
  },
  profilePicGrid: {
    // width: '60px',
    height: '60px',
  },
  likeButton:{
    height: '30px',
    width:'30px',
    // marginRight: '5px',
  },
  actionbarButtons: {
    borderTop: 'solid white 1px',
  },
  buttonText:{
    color: 'white'
  },
  postDescription:{
    minHeight: '300px'
  },
  postTitle:{
    fontSize: '1.5em'
  }
  
});
const options = { year: 'numeric', month: 'short', day: 'numeric' };


export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;

  const [Post,setPost] =useState(post)

  //const { index } = props;

  // const {userData,setUserData} = useContext(UserDataContext)
  const {user,setUser,baller,setBaller,team,setTeam} = useContext(UserContext)
  // const {baller,setBaller} = useContext(BallerContext)
  // const {team,setTeam} = useContext(TeamContext)
  // const posts = userData.posts

  const [comments,setComments]= useState(post.comments);
  const [swish,setSwish] = useState([post.swishes,post.swish_users])
  const [commentBar,setCommentBar] = useState(false)
  const [newCommentText,setNewCommentText] = useState("")

  const handleDate = (date)=>{
  const currentDate = new Date(date)
  return currentDate.toLocaleDateString('EN',options)
  }
  
  

  const handleLikes=(e)=>{
    const config = {
      method: 'put',
      url: `http://localhost:3000/users/${user._id}/posts/${post._id}/likes`,

      }
      
      axios(config).then(res=> {
        setSwish([res.data.swishes,res.data.swish_users])
      })
  }

  const handleEnter=(e)=>{
    if(e.keyCode ===13 ){
      //on keypress enter add and populate comment....
      //setNewCommentText(e.target.value)
      
      const config = {
        method: 'post',
        url: `http://localhost:3000/users/${post._id}/addcomment`,
        data: { 'poster_id':  `${user._id}`,
                'commentText': `${e.target.value}`,
                'post_id':  `${post._id}`
                }
      }
//... and get the populated comments....
      axios(config).then(res=>{ 
        console.log(res.data)
        const addComment = res.data.pop_comment
        setComments([...comments,addComment])
      })
      e.target.value=""; 
    }
  }

  const handleDelComment =  (comment_id,poster_id,post_user,deleter_id)=>{
    if (deleter_id === post_user || deleter_id === poster_id) {
    setComments(comments.filter(el=>el._id!==comment_id))
    }
    const config = {
      method: 'delete',
      url: `http://localhost:3000/users/${post._id}/deletecomment`,
      data: { 
        'comment_id':  `${comment_id}`,
        'comment_poster_id': `${poster_id}`,
        'post_user': `${post_user}`,
        'deleter_id': `${deleter_id}`
      }

    }

      axios(config).then(res=>{
      //setComments(res.data.updatedPosts.comments)
      console.log(res.data.updatedPosts)
      console.log(res.data.updatedComments)
      })
  }

  return (
  
      <Grid item xs={12} style={{paddingBottom: '10px'}}>

        <Card m={-1} className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent >
              <Grid direction="column" xs={12} md={12} >
                <Grid item>
                  <Grid container direction="row" style={{ marginBottom: '30px' }}  >
                    <Grid item  xs={2} className={classes.profilePicGrid}  >
                      <img alt="profilePic" src={`http://localhost:3000/${post.poster_id.profilePic}`} className={classes.profilePic} />
                    </Grid>
                    <Grid item xs={2} >
                      
                      <Typography component="h2" variant="h5">
                        {post.poster_id.username.toUpperCase()}<br/>
                      </Typography>
                      <Typography variant="subtitle2" paragraph>
                        {handleDate(post.date)}
                      </Typography>
                    </Grid>
                    {/* <Grid item xs={2} style={{border: '1px solid black'}} >
                      
                    </Grid> */}
                  </Grid>
                </Grid>
                <Grid item >
                  <CardActionArea component="a" href="#">
                    <Typography variant="subtitle1" paragraph >
                      {post.text}
                    </Typography>
                  </CardActionArea>
                </Grid>
                <Grid item >
                  <CardMedia className={classes.media} image={`http://localhost:3000/${post.image}`} title={post.imageTitle} />
                </Grid>

                <Grid item>

                  <Grid container direction="row" justify="space-around" align="center" className={classes.actionbarButtons} >
                    <Grid item>
                      <Button onClick={(e) =>handleLikes(e) }>
                        <img src={logo} alt="logo" className={classes.likeButton} /> <p className={classes.buttonText}> swish {swish[0]}</p>
                      </Button>
                    </Grid>

                    <Grid item>
                      <Button  onClick={()=> setCommentBar(!commentBar)}>
                        <img src={comment} alt="logo" className={classes.likeButton} /><p className={classes.buttonText}>comments  {comments.length}</p>
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button >
                        <img src={share} alt="logo" className={classes.likeButton} /><p className={classes.buttonText}>share</p>
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button >
                        <p className={classes.buttonText}>3 shares</p>
                      </Button>
                    </Grid>
                  </Grid>


                </Grid>

                {comments.length > 0 && commentBar &&
                  <Grid item>
                    <Grid container direction="column">
                      {comments.map((comment, ii) => {
                        return (
                          <Grid key={ii} item>
                            <Grid container direction="row" justify="space-around" style={{borderTop: '1px solid white',paddingTop: '20px',paddingBottom: '20px'}} alignItems="center">

                              <Grid xs={1} item>
                                <img alt="profilePic" src={`http://localhost:3000/${post.poster_id.profilePic}`} className={classes.profilePic} />
                              </Grid>

                              <Grid xs={7}item>
                                <Grid container direction="column" align="start">
                                  <Grid item>{comment.user_id.username.toUpperCase()}</Grid>
                                  <Grid item> {comment.text}</Grid>
                                </Grid>
                              </Grid>

                              <Grid item xs={2}>
                              <Grid container direction="column">
                              <Grid item>
                                {handleDate(comment.date)}
                                </Grid>
                                <Grid item >
                                <Button onClick={(e)=>handleDelComment(comment._id,comment.user_id._id,post.poster_id._id,user._id)}><img alt="deleteIcon" src={deleteIcon} style={{width:'25%'}}/></Button>
                                </Grid>
                                </Grid>
                              </Grid>
                            </Grid>

                          </Grid>
                        )
                      })}
                    </Grid>
                  </Grid>}

                  <Grid item>
                            <Grid container direction="row" justify="space-around" style={{borderTop: '1px solid white',paddingTop: '20px'}} alignItems="center">

                              <Grid  item>
                                <img alt="profilePic" src={`http://localhost:3000/${user.profilePic}`} className={classes.profilePic} />
                              </Grid>

                              <Grid xs={10}item>
                                <Grid container direction="column" align="start">
                                  <Grid item>
                                  {user.username.toUpperCase()}
                                  </Grid>
                                  <Grid item>
                                    <input type="text" placeholder="comment..."  style={{width: '100%', height:'40px',outlineWidth:'0'}}  onKeyDown={(e)=>handleEnter(e)}/>
                                  </Grid>
                                </Grid>
                              </Grid>

                              
                            </Grid>

                          </Grid>
              

              </Grid>
            </CardContent>

          </div>
        </Card>

      </Grid>
  
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};

//onChange={(e)=>setNewCommentText(e.target.value)}