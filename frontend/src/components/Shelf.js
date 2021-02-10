import React from "react";

// displays collection of mixtapes
export class Shelf extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mixes: undefined
        }
    }

    async componentWillMount() {
        const uriList = await this.props.fetch();
        this.setState({
            mixes: uriList
        })
    }

    render() {
        return (
            <div>
                <h4>Browse Mixtapes</h4>
                <div className="flex">
                    {
                        this.state.mixes !== undefined && (
                            this.state.mixes.map((uri) => {
                                return (
                                    <div className="" key={uri}>
                                        {uri}
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </div>
        );
    }
}
