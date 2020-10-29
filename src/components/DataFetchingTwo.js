import React,{useReducer,useEffect} from 'react'
import axios from 'axios';
import {Container,makeStyles,AppBar,Toolbar,IconButton,Card,CardContent,Typography,Grid,Button} from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import App from '../App';
import SimpleMenu from './Menu';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const initialState={
    loading:true,
    error:'',
    posts:{},
}
const reducer = (state,action)=>{
    
    switch(action.type){
        case 'FETCH_SUCCESS':
            return{
                loading:false,
                posts:action.payload,
                error:""
            }
        case "FETCH_ERROR":
            return{
                loading:false,
                posts:{},
                 error:"Something went wrong"
            }

        default:
            return state
    }
}


function DataFetchingTwo() {
    const classes = useStyles();

    const [state, dispatch] = useReducer(reducer, initialState)
   
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
        .then(response =>{
            dispatch({type:'FETCH_SUCCESS',payload:response.data})
        }).catch(error=>{
            dispatch({type:"FETCH_ERROR",payload:{}})
        })
    }, [])

    return (
        <div className={App}>
        <Container className={classes.root}>
            <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
           <SimpleMenu/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          <Button color="inherit" href="/">LIST OF POSTS</Button>
          </Typography>
          <Button color="inherit" onClick={{}}>Login</Button>
          <Button color="inherit" href="/favourite">
              favourite
           </Button>
        </Toolbar>
        </AppBar>
       </Container> 

      <Container maxWidth="sm" >
            {state.loading? 'loading':
            state.posts.map(post => 
                <div key={post.id} style={{maxWidth:345, padding:10}} >
                    
                    <Card style={{alignItems:"center"}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                            {post.title}
                            </Typography>
                            <Button size="small" color="primary">
                            LIKE <FavoriteBorderIcon/>
                            </Button>
                            <Button size="small" color="primary">
                            Share<ShareIcon/>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )
            }
            {state.error? 'error':null}
            </Container>
    </div>
    )
}

export default DataFetchingTwo
