import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

//Hello screen
import Hello from './screens/Hello/Hello'

//Authenticate screens
import LoginScreen from './screens/AuthSreens/loginScreen';
import Enter from './screens/AuthSreens/Enter';
import EnterPhone from './screens/AuthSreens/EnterPhone';
import EnterEmail from './screens/AuthSreens/EnterEmail';
import Register from './screens/AuthSreens/Register';
import RegisterEmail from './screens/AuthSreens/RegisterEmail';
import RegisterEmailSend from './screens/AuthSreens/RegisterEmailSend';
import RegisterPhone from './screens/AuthSreens/RegisterPhone';
import ForgotPhone from './screens/AuthSreens/ForgotPhone';
import ForgotPhoneSend from './screens/AuthSreens/ForgotPhoneSend';
import ForgotEmail from './screens/AuthSreens/ForgotEmail';
import ForgotEmailSend from './screens/AuthSreens/ForgotEmailSend';
import RegisterEmailSendFinish from './screens/AuthSreens/RegisterEmailSendFinish';

//No Profile
import NoProfile from './screens/NoProfile/NoProfile';
import About from './screens/NoProfile/About';
import Oferta from './screens/NoProfile/Oferta';
import CitySelect from './screens/NoProfile/CitySelect';
import Information from './screens/NoProfile/Information';
import InformationPage from './screens/NoProfile/InformationPage';
import ListOuter from './screens/NoProfile/ListOuter';
import List from './screens/Components/List';

//Profile (client)
import ClientProfile from './screens/Profile/ClientProfile/ClientProfile';

//Busines Profile 
import CreateBusinesProfile from './screens/Profile/BusinessProfile/BusinessCreate/createBusinessProfile';
import BusinesProfile from './screens/Profile/BusinessProfile/businesProfile';
import MyCompany from './screens/Profile/BusinessProfile/BusinessCompanyPage'

//Components
import News from './screens/Components/News';
import NewsPage from './screens/Components/NewsPage';

//Events
import Event from './screens/Events/Event';
import EventMap from './screens/Events/EventMap';

//Company
import Company from './screens/Company/Company';
import CompanyMap from './screens/Company/CompanyMap';
import CompanyAllEvents from "./screens/Company/CompanyAllEvents";
import CompanyReviews from "./screens/Company/CompanyReviews";
import CompanyReviewPage from "./screens/Company/CompanyReviewPage";


//BusinessProfile Profile
    //Create
import BusinessCreateProfile        from './screens/Profile/BusinessProfile/BusinessCreate/BusinessCreateProfile';
import BusinessCreateCompany        from './screens/Profile/BusinessProfile/BusinessCreate/BusinessCreateCompany';
import BusinessCreateEvent          from './screens/Profile/BusinessProfile/BusinessCreate/BusinessCreateEvent';
import BusinessCreateRequisit       from './screens/Profile/BusinessProfile/BusinessCreate/BusinessCreateRequisit';
import BusinessCreateCompanyMap     from './screens/Profile/BusinessProfile/BusinessCreate/BusinessCreateCompanyMap';
import BusinessCreateCompanyDesc    from './screens/Profile/BusinessProfile/BusinessCreate/BusinessCreateCompanyDesc';

import BusinessEditCompany          from './screens/Profile/BusinessProfile/BusinessEdit/BusinessEditCompany';
import BusinessEditEvent            from './screens/Profile/BusinessProfile/BusinessEdit/BusinessEditEvent';
import BusinessRequisitEdit         from './screens/Profile/BusinessProfile/BusinessEdit/BusinessEditRequisit';

import BusinessOuter                from './screens/Profile/BusinessProfile/BusinessOuter';
import RequisitesPage               from './screens/Profile/BusinessProfile/RequisitesPage';
import BusinessEventPage            from './screens/Profile/BusinessProfile/BusinessEventPage';

const RootStack = createStackNavigator({
    Hello: {
      screen: Hello,
      navigationOptions: {
        header: null
      }
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    Enter:{
      screen: Enter,
      navigationOptions: {
        header: null
      }
    },
    EnterPhone: {
      screen: EnterPhone,
      navigationOptions: {
        header: null
      }
    },
    EnterEmail: {
      screen: EnterEmail,
      navigationOptions: {
        header: null
      }
    },
    Register:{
        screen: Register,
        navigationOptions: {
            header: null
        }
    },
    RegisterEmail:{
        screen: RegisterEmail,
        navigationOptions: {
            header: null
        }
    },
    RegisterEmailSend:{
        screen: RegisterEmailSend,
        navigationOptions: {
            header: null
        }
    },
    RegisterEmailSendFinish:{
        screen: RegisterEmailSendFinish,
        navigationOptions: {
            header: null
        }
    },
    ForgotEmail:{
        screen: ForgotEmail,
        navigationOptions: {
            header: null
        }
    },
    ForgotEmailSend:{
        screen: ForgotEmailSend,
        navigationOptions: {
            header: null
        }
    },
    RegisterPhone:{
        screen: RegisterPhone,
        navigationOptions: {
            header: null
        }
    },
    ForgotPhone:{
        screen: ForgotPhone,
        navigationOptions: {
            header: null
        }
    },
    ForgotPhoneSend:{
        screen: ForgotPhoneSend,
        navigationOptions: {
            header: null
        }
    },
    NoProfile: {
        screen: NoProfile,
        navigationOptions: {
            header: null
        }
    },
    About: {
        screen: About,
        navigationOptions: {
            header: null
        }
    },
    Oferta: {
        screen: Oferta,
        navigationOptions: {
            header: null
        }
    },
    CitySelect: {
        screen: CitySelect,
        navigationOptions: {
            header: null
        }
    },
    Information: {
        screen: Information,
        navigationOptions: {
            header: null
        }
    },
    InformationPage: {
        screen: InformationPage,
        navigationOptions: {
            header: null
        }
    },
    ListOuter: {
        screen: ListOuter,
        navigationOptions: {
            header: null
        }
    },
    News: {
        screen: News,
        navigationOptions: {
            header: null
        }
    },
    NewsPage: {
        screen: NewsPage,
        navigationOptions: {
            header: null
        }
    },
    Event: {
        screen: Event,
        navigationOptions: {
            header: null
        }
    },
    EventMap: {
        screen: EventMap,
        navigationOptions: {
            header: null
        }
    },
    Company: {
        screen: Company,
        navigationOptions: {
            header: null
        }
    },
    CompanyAllEvents: {
        screen: CompanyAllEvents,
        navigationOptions: {
            header: null
        }
    },
    CompanyMap: {
        screen: CompanyMap,
        navigationOptions: {
            header: null
        }
    },
    ClientProfile: {
        screen: ClientProfile,
        navigationOptions: {
            header: null
        }
    },
    
    MyCompany: {
        screen: MyCompany,
        navigationOptions: {
            header: null
        }
    },
    List: {
        screen: List,
        navigationOptions: {
            header: null
        }
    },
    RequisitesPage: {
        screen: RequisitesPage,
        navigationOptions: {
            header: null
        }
    },
    CreateBusinesProfile: {
        screen: CreateBusinesProfile,
        navigationOptions: {
            header: null
        }
    },
    BusinesProfile: {
        screen: BusinesProfile,
        navigationOptions: {
            header: null
        }
    },
    BusinessOuter: {
        screen: BusinessOuter,
        navigationOptions: {
            header: null
        }
    },
    BusinessCreateCompany: {
        screen: BusinessCreateCompany,
        navigationOptions: {
            header: null
        }
    },
    BusinessCreateCompanyMap: {
        screen: BusinessCreateCompanyMap,
        navigationOptions: {
            header: null
        }
    },
    BusinessCreateCompanyDesc: {
        screen: BusinessCreateCompanyDesc,
        navigationOptions: {
            header: null
        }
    },
    BusinessEditCompany: {
        screen: BusinessEditCompany,
        navigationOptions: {
            header: null
        }
    },
    BusinessCreateRequisit: {
        screen: BusinessCreateRequisit,
        navigationOptions: {
            header: null
        }
    },
    BusinessRequisitEdit: {
        screen: BusinessRequisitEdit,
        navigationOptions: {
            header: null
        }
    },
    BusinessCreateEvent: {
        screen: BusinessCreateEvent,
        navigationOptions: {
            header: null
        }
    },
    BusinessEventPage: {
        screen: BusinessEventPage,
        navigationOptions: {
            header: null
        }
    },
    BusinessCreateProfile: {
        screen: BusinessCreateProfile,
        navigationOptions: {
            header: null
        }
    },
    BusinessEditEvent: {
        screen: BusinessEditEvent,
        navigationOptions: {
            header: null
        }
    },
},
{initialRouteName: ''});

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
    render() {
        return (
            <AppContainer />
        );
    }
}