// import Enzyme from 'enzyme';
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// import NavigationItems from './NavigationItems';
// import NavigationItem from './NavigationItem/NavigationItem';

// Enzyme.configure({ adapter: new Adapter() });


// // Does NOT work -> IDK how to test with context
// describe('<NavigationItems />', () => {
//     let wrapper;

//     beforeEach(() => {
//         wrapper = Enzyme.shallow(<NavigationItems />);
//     });

//     it(`should render 2 <NavigationItem /> elements if NOT authenticated`, () => {
//         expect(wrapper.find(NavigationItem)).toHaveLength(2);
//     });
    
//     it(`should render 3 <NavigationItem /> elements if authenticated`, () => {
//         wrapper.setProps({ isAuthenticated: true });
//         expect(wrapper.find(NavigationItem)).toHaveLength(3);
//     });
// });

