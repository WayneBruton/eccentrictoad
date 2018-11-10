$(function() {
    axios.get('https://www.waterdashboard.co.za/api/v1/city?api_key=3e2afb2215d12b81dd8e3ab30a094b08')
        .then(response => {
            // console.log(response.data);
            let data = response.data;
            // console.log(data);

            let lastRain = moment(data.previous_rain_day.datetime).format('dddd MMMM Do YYYY');
            let lastUpdate = moment(data.last_updated.datetime).format('dddd MMMM Do YYYY');
            let usageIconBetter = `<i class="fas fa-thumbs-up fa-3x"></i>`;
            let usageIconWorse = `<i class="fas fa-thumbs-down fa-3x"></i>`;
            let damLevelBetter = `<i class="fas fa-thumbs-up fa-3x"></i>`;
            let damLevelWorse = `<i class="fas fa-thumbs-down fa-3x"></i>`;

            $('#cityUsageCurrent').text(`${data.city_usage.current} ${data.city_usage.metric}`);
            $('#cityUsageTarget').text(`${data.city_usage.target} ${data.city_usage.metric}`);
            $('#damLevelCurrent').text(`${data.dam_level.current} ${data.dam_level.metric}`);
            $('#damLevelPrevious').text(`${data.dam_level.previous} ${data.dam_level.metric}`);
            $('#lastRain').text(`${lastRain}`);
            $('#updated').text(`${lastUpdate}`);
            if (data.city_usage.current > data.city_usage.target) {
                $(usageIconWorse).appendTo("#cityUsage");
            } else {
                $(usageIconBetter).appendTo("#cityUsage");
            }

            if (data.dam_level.current < data.dam_level.previous) {
                $(damLevelWorse).appendTo("#damLevel");
            } else {
                $(damLevelBetter).appendTo("#damLevel");
            }
            $('.city').css("display", "block");
            $('.fas').css("display", "block");
            $('hr').css("display", "block");
            // $('.container').css("display", "block");
        })

        .catch(resonse => console.log(response));
});