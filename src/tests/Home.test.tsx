import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../pages/Home";

// a basic test to check if the form renders
test("renders Profile Form heading", () => {
    render(<Home />)
    const heading = screen.getByText(/Profile Form/);
    expect(heading).toBeInTheDocument();
});

// a test to simulate typing in the name input
test("updates name input field when the user types", async () => {
    render(<Home />);

    const nameInput = screen.getByLabelText(/Name:/i) as HTMLInputElement;
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "John Cena");

    expect(nameInput.value).toBe("John Cena");
});

// a test to simulate typing in the email input
test("updates email input field when the user types", async () => {
    render(<Home />);

    const emailInput = screen.getByLabelText(/Email:/i) as HTMLInputElement;
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "john.cena@gmail.com");

    expect(emailInput.value).toBe("john.cena@gmail.com");
});

// a test to simulate typing in the bio input
test("updates bio input field when the user types", async () => {
    render(<Home />);

    const bioInput = screen.getByLabelText(/Bio:/i) as HTMLInputElement;
    await userEvent.clear(bioInput);
    await userEvent.type(bioInput, "And his name is... John Cena!");

    expect(bioInput.value).toBe("And his name is... John Cena!");
});

// a test to check if the correct value is stored in localStorage when changed
test("stores value in localStorage when changed", async () => {
    render(<Home />);

    const nameInput = screen.getByLabelText(/Name:/i) as HTMLInputElement;
    await userEvent.clear(nameInput);    
    await userEvent.type(nameInput, "John Cena");

    expect(localStorage.getItem("profileName")).toBe("John Cena");
});

// a test to load the value from localStorage on first render
test("loads the value from localStorage on first render", () => {

    // mock localStorage before rendering
    jest.spyOn(window.localStorage.__proto__, 'getItem')
        .mockImplementation((key) => {
            const mockData: Record<string, string> = {
                profileName: "John Cena",
                profileEmail: "john.cena@gmail.com",
                profileBio: "And his name is... John Cena!",
                profileColour: "#000000",
                profileImageURL: "https://wwe.com/john-cena.png",
            };
            return mockData[key as keyof typeof mockData] || "";
        });

    render(<Home />);

    expect(screen.getByLabelText(/Name:/i)).toHaveValue("John Cena");
    expect(screen.getByLabelText(/Email:/i)).toHaveValue("john.cena@gmail.com");
    expect(screen.getByLabelText(/Bio:/i)).toHaveValue("And his name is... John Cena!");
    expect(screen.getByLabelText(/Colour:/i)).toHaveValue("#000000");
    expect(screen.getByLabelText(/Image URL:/i)).toHaveValue("https://wwe.com/john-cena.png");
});

// a test to check if clicking the clear button resets all inputs
test("clicking the clear button resets all inputs", async () => {
  render(<Home />);

  const nameInput = screen.getByLabelText(/Name:/i) as HTMLInputElement;
  const emailInput = screen.getByLabelText(/Email:/i) as HTMLInputElement;
  const bioInput = screen.getByLabelText(/Bio:/i) as HTMLInputElement;
  const colourInput = screen.getByLabelText(/Colour:/i) as HTMLInputElement;
  const imageInput = screen.getByLabelText(/Image URL:/i) as HTMLInputElement;

  // Pre-fill the fields
  await userEvent.type(nameInput, "John Cena");
  await userEvent.type(emailInput, "john.cena@gmail.com");
  await userEvent.type(bioInput, "And his name is... John Cena!");
  await userEvent.type(imageInput, "https://wwe.com/john-cena.png");
  await userEvent.type(colourInput, "#000000");

  const clearBtn = screen.getByRole("button", { name: /clear/i });
  await userEvent.click(clearBtn);

  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
  expect(bioInput).toHaveValue("");
  expect(colourInput).toHaveValue("#ffffff"); // default
  expect(imageInput).toHaveValue("");
});

afterEach(() => {
    jest.restoreAllMocks(); // resets mocked getItem
    localStorage.clear();
});
