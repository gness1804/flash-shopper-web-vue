import { mount } from 'avoriaz';
import Toast from '@/components/Toast';

describe('Toast.vue', () => {
  const message = 'Red beans added to main list.';
  const propsData = {
    message,
  };

  it('renders with the correct content', () => {
    const component = mount(Toast, { propsData });
    const el = component.find('.toast-message')[0];
    expect(el.text()).to.equal('Red beans added to main list.');
  });
});
