export default function CreateBoard() {
    return (
        <div>
            <h1>Create New Kudoboard</h1>
            <form>
                <label>
                    Who is this Kudoboard for?
                    <input type="text" placeholder="First name"/>
                    <input type="text" placeholder="Last name" />
                </label>
                <label>
                    What title would you like on top of the Kudoboard?
                    <input type="text" />
                </label>
            </form>
        </div>
    );
}