var GIPHY_PUB_KEY = '0caB0mf9hB1Iwf0YjYpmMZuLpjth9saa',
    GIPHY_API_URL = 'https://api.giphy.com';
    
App = React.createClass({

    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },


    handleSearch: function (searchingText) {  // 1.
        this.setState({
            loading: true  // 2.
        });
        this.getGif(searchingText)
            .then((gif) => {  // 3.
                this.setState({  // 4
                    loading: false,  // a
                    gif: gif,  // b
                    searchingText: searchingText  // c
                });
            })
            .catch((error) => concole.log(error));
    },

    /////////Promise 

    getGif: function (searchingText) {
        return new Promise((resolve, reject) => {
            const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText).data; 
                    const gif = { 
                        url: data.fixed_width_downsampled_url,
                        sourceUrl: data.url
                    };
                    resolve(gif);  
                }
                else {
                    reject(new Error('Whoops!'));
                }
            };
            xhr.send();
        })
    },

    //////////
    
    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIFów!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch} />
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
          </div>
        );
    }
});