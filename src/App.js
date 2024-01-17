import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefault";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import { useUser } from "./contexts/UserContext";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from './pages/profiles/ UserPasswordForm'
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from "./components/NotFound";

function App() {
  const user = useUser(); 
  const profile_id = user?.profile_id || ''; 

  return (
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route 
                exact
                path="/" 
                render={() => (
                  <PostsPage message='No results found. Ajust search keywords.'/>
                )} 
              />
              <Route 
                exact 
                path="/feed" 
                render={() => (
                  <PostsPage 
                    message='No results found. Follow an user.'
                    filter={`owner__followed__owner__profile=${profile_id}&`}
                  />
                )} 
              />
              <Route 
                exact 
                path="/liked" 
                render={() => (
                  <PostsPage 
                    message='No results found. Like a post.'
                    filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
                  />
                )} 
              />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path='/posts/create' render={() => <PostCreateForm />} />
              <Route exact path='/posts/:id' render={() => <PostPage />} />
              <Route exact path='/posts/:id/edit' render={() => <PostEditForm />} />
              <Route exact path='/profiles/:id' render={() => <ProfilePage />} />
              <Route 
                exact
                path='/profiles/:id/edit/username' 
                render={() => <UsernameForm />} />
              <Route
                exact
                path="/profiles/:id/edit/password"
                render={() => <UserPasswordForm />}
              />
              <Route
                exact
                path="/profiles/:id/edit"
                render={() => <ProfileEditForm />}
              />
              <Route render={() => <NotFound />} />
            </Switch>
          </Container>
        </div>
      
  );
}

export default App;
