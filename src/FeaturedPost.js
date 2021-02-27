import React,{useContext,useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Grid,Link} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import comment from './assets/img/comment_button.svg'
import share from './assets/img/share_button.svg'
import axios from 'axios'
import './App.css'
import { Button } from '@material-ui/core';
import logo from './assets/img/theme_wolf/logo_button.png'

import UserContext from './contexts/UserContext'
import deleteIcon from './assets/img/deleteIcon.png'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  card: {
   
    borderRadius: '20px',
    backgroundColor: 'rgb(0,0,0)',
    color: 'rgb(200,200,200)',
    
  },
  cardDetails: {
    flex: 1,
    width: '100%',
    color: 'rgb(200,200,200)',
    
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
  },
  media: {
    paddingTop: '56.25%',
    minWidth: '100%',    
  },
  profilePicGrid: {
    width: '100%',
    height: '60px',
  },
  likeButton:{
    height: '30px',
    width:'30px',
  },
  actionbarButtons: {
    borderTop: 'solid rgb(200,200,200) 1px',
    borderBottom: 'solid rgb(200,200,200) 1px',
    height: "3em",
    marginBottom: "2%"
   
  },
  buttonText:{
    color: 'rgb(200,200,200)',
    marginLeft: '5px',
    '&:hover': {
      textShadow: "0 0 3px rgb(200,200,200), 0 0 5px rgb(200,200,200,0.7)",
  },
    
  },
  postDescription:{
    minHeight: '300px'
  },
  postTitle:{
    fontSize: '1.5em'
  },
  date:{
    color: 'rgb(70,70,70)',
    fontSize: '80%',
    margin: "0",
    padding: "0"
  },

  posterName:{
    textDecoration: "none",
    color: 'rgb(200,200,200)',
    margin: "0",
  
    padding: "0",
    
    '&:hover': {
      textDecoration: "none",
      textShadow: "0 0 3px rgb(200,200,200), 0 0 5px rgb(200,200,200,0.7)",
    }
  }
  
});
const options = { year: 'numeric', month: 'short', day: 'numeric' };


export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;

  const {user,setUser,baller,setBaller,team,setTeam} = useContext(UserContext)

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
      url: `https://bbcombackend.herokuapp.com/users/${user._id}/posts/${post._id}/likes`,

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
        url: `https://bbcombackend.herokuapp.com/users/${post._id}/addcomment`,
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
      url: `https://bbcombackend.herokuapp.com/users/${post._id}/deletecomment`,
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
  
    

      <Card m={-1} className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent >
            <Grid direction="column" xs={12} md={12} spacing={6}>
              <Grid item>
                <Grid container direction="row" justify="space-between" alignItems="flex-start"  style={{marginLeft: '2%'}} >
                  <Grid item xs={1}   >
                    <img alt="profilePic" src={`https://bbcombackend.herokuapp.com/${post.poster_id.profilePic}`} className={classes.profilePic} />
                  </Grid>
                  <Grid item xs={7} >
                    <Grid container direction="column" alignContent="flex-start" justify="flex-start" textJustify="flex-start">
                      <Grid item>
                      <Link href={`/user/${post.poster_id._id}`} className={classes.posterName}>
                        <Typography component="h2" variant="h5">
                          {post.poster_id.username.toUpperCase()} 
                        </Typography>
                        </Link>
                      </Grid>
                      <Grid item >
                        <Typography variant="body1"  className={classes.date} align="left">
                          {handleDate(post.date)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={2} >

                  </Grid>

                </Grid>
              </Grid>
              <Grid item container >
                
                  <Typography style={{textAlign:"flex-start", margin: '2%'}} variant="subtitle1" paragraph >
                    {post.text}
                  </Typography>
                
              </Grid>
              {post.image && <Grid item >
                <CardMedia className={classes.media} image={`https://bbcombackend.herokuapp.com/${post.image}`} title={post.imageTitle} />
              </Grid>}

              <Grid item style={{ marginLeft: '2%',marginRight: '2%',marginTop: '2%'  }}>

                <Grid container direction="row" justify="space-between" className={classes.actionbarButtons} >

                  <Grid item style={{ height:"100%"}} >
                    <Button onClick={(e) => handleLikes(e)} style={{height: "100%"}}>
                      <img src={logo} alt="logo" className={classes.likeButton} /> <p className={classes.buttonText}>  swish {swish[0]}</p>
                    </Button>
                  </Grid>

                  <Grid item style={{ height:"100%"}}>
                    <Button onClick={() => setCommentBar(!commentBar)} style={{ height:"100%"}}>
                      <img src={comment} alt="logo" className={classes.likeButton} /><p className={classes.buttonText}>comments  {comments.length>0&&comments.length}</p>
                    </Button>
                  </Grid>
                  <Grid item style={{ height:"100%"}}>
                    <Button style={{ height:"100%"}} >
                      <img src={share} alt="logo" className={classes.likeButton} /><p className={classes.buttonText}>share</p>
                    </Button>
                  </Grid>
                  <Grid item style={{ height:"100%"}}>
                    <Button style={{ height:"100%"}}>
                      <p className={classes.buttonText}>3 shares</p>
                    </Button>
                  </Grid>
                </Grid>


              </Grid>

              {comments.length > 0 && commentBar &&
                <Grid item style={{ marginLeft: '2%', marginRight: '2%' }} >
                  <Grid container direction="column">
                    {comments.map((comment, ii) => {
                      return (
                        <Grid key={ii} item>
                          <Grid container direction="row" justify="space-between" style={{ borderTop: '1px solid rgb(200,200,200)', paddingTop: '2%',paddingBottom: "2%" }} alignItems="flex-start" >

                            <Grid xs={1} item>
                              <img alt="profilePic" src={`https://bbcombackend.herokuapp.com/${post.poster_id.profilePic}`} className={classes.profilePic} />
                            </Grid>

                            <Grid xs={7} item>
                              <Grid container direction="column" align="start" >
                                <Grid item>{comment.user_id.username.toUpperCase()}</Grid>
                                <Grid item > {comment.text}</Grid>
                              </Grid>
                            </Grid>

                            <Grid item xs={2} >

                              <Grid container direction="column" justify= "flex-start" >
                                <Grid item alignContent="flex-start">
                                  <p className={classes.date}>{handleDate(comment.date)}</p>
                                </Grid>
                                <Grid item  >
                                  <Button onClick={(e) => handleDelComment(comment._id, comment.user_id._id, post.poster_id._id, user._id)}><img alt="deleteIcon" src={deleteIcon} style={{ width: '25%' }} /></Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                        </Grid>
                      )
                    })}
                  </Grid>
                </Grid>}

              <Grid item style={{ marginLeft: '2%',marginRight: '2%', marginBottom:"-2%" }}>
                <Grid container direction="row" justify="space-between" style={{ borderTop: '1px solid rgb(200,200,200)', paddingTop: '2%' }} alignItems="flex-start">

                  <Grid item xs={1}>
                    <img alt="profilePic" src={`https://bbcombackend.herokuapp.com/${user.profilePic}`} className={classes.profilePic} />
                  </Grid>

                  <Grid xs={10} item>
                    <Grid container direction="column" align="start">
                      <Grid item>
                        {user.username.toUpperCase()}
                      </Grid>
                      <Grid item>
                        <input type="text" placeholder="comment..." style={{ width: '100%', height: '40px', outlineWidth: '0' }} onKeyDown={(e) => handleEnter(e)} />
                      </Grid>
                    </Grid>
                  </Grid>


                </Grid>

              </Grid>


            </Grid>
          </CardContent>

        </div>
      </Card>

    
  
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};
//classname={classes.buttionsActionbar}