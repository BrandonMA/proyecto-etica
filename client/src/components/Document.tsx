import React from 'react';
import Container from 'react-bootstrap/Container';
import ReactMarkdown from 'react-markdown';

interface Props {
    id: string,
    content: string
}

// https://word2md.com

const input = `
# **Los actores activos y pasivos de la corrupción en el ámbito tecnológico**

La corrupción afecta a la gran mayoría de los países pobres y ricos: al distorsionar las asignaciones de recursos, puede disminuir el bienestar social y perjudicar la acumulación de capital, lo que también conduce a un menor crecimiento y pobreza en sectores que no deberían de ser afectados.

Dado que la corrupción afecta principalmente al sector público, los economistas insinúan a las instituciones políticas como su causa inmediata: aunque las reglas electorales, la fuerza de la competencia de los partidos y el tipo de gobierno no causan directamente la corrupción, estos son los marcos que configuran las decisiones políticas y crean renta -buscando oportunidades.

Desafortunadamente, el concepto de que las instituciones políticas son la causa inmediata es hasta cierto punto erróneo aunque una gran cantidad de personas lo den por cierto, ya que para que un acto de corrupción ocurra debe de haber dos entidades. Podemos dividir la corrupción en dos categorías, activa y pasiva. La corrupción activa consiste en la parte que tome la iniciativa de ofrecer un pago fuera de la legalidad en busca de obtener un beneficio que de otra manera no podría obtener, relacionándolo con las grandes empresas de software la manera de corrupción más común son los sobornos debido a las grandes cantidades de dinero que manejan.

## **Microsoft y su papel activo en la corrupción**

Microsoft se ha convertido en una de las compañías de más alto perfil en ser investigada por acusaciones de corrupción y soborno. Se alega que Microsoft vendió software con un gran descuento para las empresas que actuaban como intermediarios. Estas empresas luego vendieron el software a agencias gubernamentales a precio completo.

La investigación está tratando de determinar si el dinero obtenido de la reventa se usó para sobornar a funcionarios húngaros. Esto tiene múltiples implicaciones más allá de la venta del software a menor precio, ya que de haber sido el caso de que se sobornó a funcionarios húngaros, no solo es culpa de los empleados de Microsoft, si no que los mismos funcionarios húngaros aceptaron tomar la posición pasiva de la corrupción, por lo que deberían de ser castigados igualmente.

Desde que las acusaciones salieron a la luz, Microsoft ha enfatizado lo serio que se toma su responsabilidad de &quot;tomar medidas para capacitar a nuestros empleados y construir sistemas para prevenir y detectar violaciones, y cuando recibamos acusaciones, investigarlas a fondo y tomar las medidas apropiadas&quot;. Desgraciadamente, este tipo de comportamientos siguen ocurriendo, aunque por otro lado, el gobierno húngaro tiene la misma cantidad de responsabilidad que Microsoft.

## **Antecedentes de la corrupción en la industria**

El mundo de la tecnología está en constante evolución. Microsoft, como tantos en la vanguardia de la tecnología, busca mantenerse a la vanguardia de los desarrollos. También buscan mantener y mejorar su posición en los mercados tecnológicos de todo el mundo, por lo que la corrupción pudiera parecer una opción sencilla para aumentar su cuota de mercado, desgraciadamente, esto solo demuestra una incapacidad de competir de manera limpia, que puede afectar la vida de miles de personas en un futuro.

Muchas otras industrias y sectores comerciales han visto algunos de sus principales nombres enfrentarse a problemas legales masivos debido a su presunta participación en el soborno para asegurar grandes negocios, con nombres como Volkswagen como un gran ejemplo. Aeroespacial, minería, petróleo y productos farmacéuticos son solo algunas de la industrias que han caído en el mismo problema. No está fuera del alcance de la posibilidad de que los gigantes del software y la tecnología puedan ser los próximos grandes nombres que enfrentan grandes dolores de cabeza legales, si no toman las medidas adecuadas para eliminar la posibilidad de irregularidades.

## **Recomendaciones y razones para combatirlo**

La falta de una evaluación adecuada de todos los aspectos del trabajo de una empresa permitirá que el comportamiento ilegal existente continúe sin control ni reconocimiento. Incluso si actualmente no hay irregularidades, un enfoque inexistente para la prevención casi lo alienta a desarrollarse. Todas las empresas deben ser conscientes del valor de una investigación interna, puede identificar y eliminar aspectos de una empresa que la hacen vulnerable a este tipo de prácticas, que no solo puede ayudar a prevenir multas, si no que permite demostrar a sus consumidores el compromiso social.

Cuando se ha identificado actividad criminal en una empresa, es probable que esa empresa reciba un trato menos severo si realiza un autoinforme sobre lo que sucedió en lugar de esperar a que las autoridades lo descubran y lleven a cabo su propia investigación. Incluso si la empresa solo comienza su propia investigación al mismo tiempo o después de que una agencia externa comience sus investigaciones, se le dará crédito si comparte los resultados de su investigación, coopera con las autoridades y se ve que realiza cambios genuinos en sus prácticas de trabajo. para evitar que se repita la fechoría.

## **Conclusión**

Las empresas que impulsan la revolución tecnológica mundial son capaces de increíbles hazañas científicas, de las cuales todos podemos beneficiarnos. Pero es necesario que estas empresas tengan un compromiso social, donde se rigen por la ética, ya que la mayoría de estas empresas no solo trabajan con grandes cantidades de dinero que pueden desestabilizar un país, si no con la información de millones de personas, por lo que implementar sistemas de anticorrupción debe ser una prioridad.



## **Fuentes**

Boisvert, Anne-Marie Lynda, Peter Dent and Ophelie Brunelle Quraishi. (2014) Corruption in Canada: Definitions and Enforcement. Prepared by Deloitte LLP. Ottawa, ON: Public Safety Canada, 2014.

Fleishman, G. (2018). Microsoft Investigated for Alleged Bribery and Corruption in Hungary. Retrieved 7 September 2019, from https://fortune.com/2018/08/23/microsoft-investigation-bribery-corruption-hungary/

Microsoft accused of &#39;bribery and corruption&#39;. Retrieved 1 September 2019, from https://www.itpro.co.uk/policy-legislation/31776/microsoft-accused-of-bribery-and-corruption
`;

const Home: React.FunctionComponent<{}> = () => {
    return(
        <Container>
            <ReactMarkdown source={input.split('\n').join('  \n')}/>
        </Container>
    );
}

export default Home;
