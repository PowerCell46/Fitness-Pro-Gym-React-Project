export function Section(props) {
    return (
        <section>
                <h3>{props.title}</h3>
                <div className="prices">
                    <table>
                        <tr>
                            <th>Category</th>
                            <th>Price</th>
                        </tr>
                        <tr>
                            <td>Under 18</td>
                            <td>{props.under18}.<sup>00</sup> Lv.</td>
                        </tr>
                        <tr>
                            <td>Men</td>
                            <td>{props.men}.<sup>00</sup> Lv.</td>
                        </tr>
                        <tr>
                            <td>Women</td>
                            <td>{props.women}.<sup>00</sup> Lv.</td>
                        </tr>
                    </table>
                </div>
            </section>
    );
}