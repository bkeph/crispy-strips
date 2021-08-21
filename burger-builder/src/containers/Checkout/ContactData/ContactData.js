import { Component } from "react";
import Button from "../../../components/UI/Button/Button";

class ContactData extends Component {
    state = {
        name: null,
        email: null,
        street: null,
        city: null,
        postalcode: null,
    }
    
    render() {
        return(
            <div>
                <h4>Enter your contact data:</h4>
                <form>
                <input name="name" type="text" placeholder="Your name" />
                <input name="email" type="email" placeholder="Your email" />
                <input name="street" type="text" placeholder="Your street" />
                <input name="city" type="text" placeholder="Your city" />
                <input name="postalcode" type="text" placeholder="Your postalcode" />

                <Button
                    style = {{ backgroundImage: "linear-gradient(rgba(186, 255, 130, 0.5), rgba(30, 255, 0, 0.25))" }}>
                        Order
                </Button>
                </form>
            </div>
        );
    }
}