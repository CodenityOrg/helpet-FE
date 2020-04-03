<template functional>
    <section class="section">
        <div style="width: 100%; height: 100%;">
            <div style="float:left; width: 60%;">
                <div style="margin: 100px;">
                    <h4 style="color: white;">Enviar mensaje</h4>
                    <form class="contact-form" action="" >
                        <input class="form-input" placeholder="Nombre completo" type="text">
                        <input class="form-input" placeholder="Correo" type="text">
                        <textarea class="form-textarea" placeholder="Mensaje" name="" cols="30" rows="10"></textarea>
                        <input style="background: none; width: 200px; height: 50px; border: 1px solid white; color: white; border-radius: 10px; " type="submit" value="Enviar">
                    </form>
                </div>
            </div>
            <div class="info">
                <div class="background-image"></div>
                <div class="panel">  
                    <h1>Contactanos</h1>
                    <p> Telefono:  </p>
                    <p> Direccion: </p>
                    <p> Info: </p>
                    <div class="mapouter">
                        <div class="gmap_canvas">
                            <iframe height="350" id="gmap_canvas" src="https://maps.google.com/maps?q=peru&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="width: 100%; background: #404040; height: 40px; position: absolute; bottom: 0;">
        </div>
    </section>
</template>
<style>

    .info {
        float:right; 
        width: 40%; 
        min-width: 300px; 
        background: white; 
        display:block; 
        height: 100%;
        position: relative;
    }

    .background-image {
        background-image: url('../../assets/img/map-sample.png');
        filter: blur(4px);
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .info .panel {
        border: 1px solid #c7c4c4;
        margin: 60px;
        padding: 40px;
        height: calc(100% - 140px);
        color: black;
        box-shadow: 8px 4px #ccc5c578;
        background: white;
        position: relative;
    }

    .info h1 {
        margin-bottom: 30px;
    }

    .contact-form .form-input {
        background: none; 
        border: 1px solid white; 
        border-radius: 10px; 
        color: white; 
        margin: 5px 0;
        padding: 10px;
        height: 60px; 
        width: 100%; 
    }

    .contact-form .form-textarea {
        background: none; 
        border: 1px solid white; 
        height: 220px; 
        border-radius: 10px; 
        width: 100%; 
        margin: 5px 0; 
        color: white; 
        padding: 10px;
        outline: none;
    }

    .contact-form .form-input:focus {
        border: 1px solid white;
        outline: none;
    }
    
    .form-input::placeholder, .form-textarea::placeholder {
        color: white;
    }

    .mapouter{
        position: absolute;
        text-align:right;
        height:350px;
        width:100%;
        bottom: 0;
        margin: 20px;
    }
    
    .gmap_canvas {
        overflow:hidden;
        background:none!important;
        height:350px;
        width: 90%;
    }

    .gmap_canvas iframe {
        width: 100%;
    }
</style>