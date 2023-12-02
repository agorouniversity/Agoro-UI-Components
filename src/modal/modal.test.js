import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Modal } from './modal';

test('Modal is hidden by default', () => {
  render(
    <Modal open={false}>
      <Modal.Title>
        Test Modal
      </Modal.Title>
      <Modal.Body>
        <label htmlFor='input'>Test Input</label>
        <input id='label'/>
      </Modal.Body>
    </Modal>
  );
  const title = screen.queryByText('Test Modal');
  expect(title).not.toBeInTheDocument();
  const input = screen.queryByLabelText('Test Input');
  expect(input).not.toBeInTheDocument();
});

test('Modal can be shown by default', () => {
  render(
    <Modal open={true}>
      <Modal.Title>
        Test Modal
      </Modal.Title>
      <Modal.Body>
        <label htmlFor='input'>Test Input</label>
        <input id='input'/>
      </Modal.Body>
    </Modal>
  );

  const title = screen.getByText('Test Modal');
  expect(title).toBeInTheDocument();
  const input = screen.getByLabelText('Test Input');
  expect(input).toBeInTheDocument();
  const confirm = screen.getByText('Confirm');
  expect(confirm).toBeInTheDocument();
  const cancel = screen.getByText('Cancel');
  expect(cancel).toBeInTheDocument();
});

test('Close button can be shown', () => {
  render(
    <Modal open={true} closeBtn>
      <Modal.Title/>
      <Modal.Body/>
    </Modal>
  );

  const close = screen.getByText('Close');
  expect(close).toBeInTheDocument();
  const confirm = screen.queryByText('Confirm');
  expect(confirm).not.toBeInTheDocument();
  const cancel = screen.queryByText('Cancel');
  expect(cancel).not.toBeInTheDocument();
});

test('Confirm button submits form', async () => {
  const user = userEvent.setup();

  const mockConfirm = jest.fn(
    (data) => Promise.resolve()
  );

  render(
    <Modal open={true} confirm={mockConfirm} cancel={() => {}}>
      <Modal.Title/>
      <Modal.Body>
        <label htmlFor='input'>Test Input</label>
        <input id='input'/>
      </Modal.Body>
    </Modal>
  );

  const confirm = screen.getByText('Confirm');
  expect(confirm).toBeInTheDocument();
  const input = screen.getByLabelText('Test Input');
  await user.type(input, 'test');
  await user.click(confirm);
  await waitFor(() => {
    expect(mockConfirm).toHaveBeenCalled();
  })
});

test('Cancel button hides modal', async () => {
  const user = userEvent.setup();
  let show = true;

  render(
    <Modal open={show} cancel={() => {show = false;}}>
      <Modal.Title>
        Test Modal
      </Modal.Title>
      <Modal.Body>
        <label htmlFor='input'>Test Input</label>
        <input id='input'/>
      </Modal.Body>
    </Modal>
  );

  const title = screen.getByText('Test Modal');
  expect(title).toBeInTheDocument();
  const input = screen.getByLabelText('Test Input');
  expect(input).toBeInTheDocument();

  const cancel = screen.getByText('Cancel');
  await user.click(cancel);

  await waitFor(() => {
    const title = screen.queryByText('Test Modal');
    expect(title).not.toBeInTheDocument();
  })

  await waitFor(() => {
    const input = screen.queryByLabelText('Test Input');
    expect(input).not.toBeInTheDocument();
  })
});

test('Close button hides modal', async () => {
  const user = userEvent.setup();
  let show = true;

  render(
    <Modal open={show} cancel={() => {show = false;}} closeBtn>
      <Modal.Title>
        Test Modal
      </Modal.Title>
      <Modal.Body>
        <label htmlFor='input'>Test Input</label>
        <input id='input'/>
      </Modal.Body>
    </Modal>
  );

  const title = screen.getByText('Test Modal');
  expect(title).toBeInTheDocument();
  const input = screen.getByLabelText('Test Input');
  expect(input).toBeInTheDocument();

  const Close = screen.getByText('Close');
  await user.click(Close);

  await waitFor(() => {
    const title = screen.queryByText('Test Modal');
    expect(title).not.toBeInTheDocument();
  })

  await waitFor(() => {
    const input = screen.queryByLabelText('Test Input');
    expect(input).not.toBeInTheDocument();
  })
});

test('Esc key hides modal', async () => {
  let show = true;

  render(
    <Modal open={show} cancel={() => {show = false;}} closeBtn>
      <Modal.Title>
        Test Modal
      </Modal.Title>
      <Modal.Body>
        <label htmlFor='input'>Test Input</label>
        <input id='input'/>
      </Modal.Body>
    </Modal>
  );

  const title = screen.getByText('Test Modal');
  expect(title).toBeInTheDocument();
  const input = screen.getByLabelText('Test Input');
  expect(input).toBeInTheDocument();

  fireEvent.keyDown(title, {key: 'Escape'})

  await waitFor(() => {
    const title = screen.queryByText('Test Modal');
    expect(title).not.toBeInTheDocument();
  })

  await waitFor(() => {
    const input = screen.queryByLabelText('Test Input');
    expect(input).not.toBeInTheDocument();
  })
});

test('Confirm button hides modal', async () => {
  const user = userEvent.setup();
  let show = true;

  const mockConfirm = jest.fn(
    (data) => Promise.resolve()
  );

  render(
    <Modal open={show} confirm={mockConfirm} cancel={() => {show = false;}}>
      <Modal.Title>
        Test Modal
      </Modal.Title>
      <Modal.Body>
        <label htmlFor='input'>Test Input</label>
        <input id='input'/>
      </Modal.Body>
    </Modal>
  );

  const title = screen.getByText('Test Modal');
  expect(title).toBeInTheDocument();
  const input = screen.getByLabelText('Test Input');
  expect(input).toBeInTheDocument();

  const confirm = screen.getByText('Confirm');
  await user.click(confirm);

  await waitFor(() => {
    const title = screen.queryByText('Test Modal');
    expect(title).not.toBeInTheDocument();
  })

  await waitFor(() => {
    const input = screen.queryByLabelText('Test Input');
    expect(input).not.toBeInTheDocument();
  })
});

test('Confirm button shows loading', async () => {
  const user = userEvent.setup();
  let show = true;

  const mockConfirm = jest.fn(
    (data) => {
      return new Promise((res) => {
        setTimeout(() => {
          res();
        }, 500)
      })
    }
  );

  render(
    <Modal open={show} confirm={mockConfirm} cancel={() => {show = false;}}>
      <Modal.Title>
        Test Modal
      </Modal.Title>
      <Modal.Body>
        <label htmlFor='input'>Test Input</label>
        <input id='input'/>
      </Modal.Body>
    </Modal>
  );

  const confirm = screen.getByText('Confirm');
  await user.click(confirm);

  await waitFor(() => {
    const loading = screen.getByRole('progressbar');
    expect(loading).toBeInTheDocument();
  })
});

test('Modal stays on submit reject', async () => {
  const user = userEvent.setup();

  const mockConfirm = jest.fn(
    (data) => Promise.reject()
  );

  render(
    <Modal open={true} confirm={mockConfirm} cancel={() => {}}>
      <Modal.Title>
        Test Modal
      </Modal.Title>
      <Modal.Body>
        <label htmlFor='input'>Test Input</label>
        <input id='input'/>
      </Modal.Body>
    </Modal>
  );

  const title = screen.getByText('Test Modal');
  expect(title).toBeInTheDocument();
  const input = screen.getByLabelText('Test Input');
  expect(input).toBeInTheDocument();
  const confirm = screen.getByText('Confirm');
  expect(confirm).toBeInTheDocument();
  const textInput = screen.getByLabelText('Test Input');
  await user.type(textInput, 'test');
  await user.click(confirm);
  await waitFor(() => {
    expect(title).toBeInTheDocument();
  })
  await waitFor(() => {
    expect(input).toBeInTheDocument();
  })
});

