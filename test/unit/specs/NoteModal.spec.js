import { mount } from 'avoriaz';
import NoteModal from '@/components/NoteModal';

describe('NoteModal', () => {
  const propsData = {
    note: 'One can substitute honey for sugar.',
  };

  it('should render correctly', () => {
    const component = mount(NoteModal, { propsData });
    const header = component.find('h2')[0];
    expect(header.text().trim()).to.equal('Edit Note');
  });

  it('clicking the close modal button should trigger the closeModal method', () => {
    const component = mount(NoteModal, { propsData });
    const closeModal = sinon.stub();
    component.setMethods({ closeModal });
    const button = component.find('.close-modal-button')[0];
    button.trigger('click');
    expect(closeModal.calledOnce).to.equal(true);
  });
});
