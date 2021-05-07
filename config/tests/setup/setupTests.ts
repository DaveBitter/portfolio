import { configure, } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

// @ts-ignore
jest.mock('next/router', () => ({
    useRouter() {
        return {
            replace: jest.fn(),
            push: jest.fn(),
            query: {},
            route: 'test'
        };
    }
}));
